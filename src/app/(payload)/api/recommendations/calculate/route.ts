// src/app/(payload)/api/recommendations/calculate/route.ts
import { NextResponse } from 'next/server'
import { calculateScore } from '../utils/calculateScore'
import { validateInput } from '../utils/validateInput'
import type { Submission, QuestionnaireResponses, UserPreferences } from '../types'
import payload from 'payload'

export async function GET(req: Request) {
  console.log('[API] Received request for recommendation calculation')

  try {
    const { searchParams } = new URL(req.url)
    const submissionId = searchParams.get('id')
    console.log(`[API] submissionId: ${submissionId}`)

    if (!submissionId) {
      console.error('[API] No submission ID provided')
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 })
    }

    // Fetch questionnaire responses with depth for nested data
    const submission = await payload.findByID({
      collection: 'Questionnaires',
      id: submissionId,
      depth: 2
    }) as Submission | null
    console.log('[API] Fetched submission:', submission)

    if (!submission?.responses) {
      console.error('[API] Invalid or missing responses in submission')
      return NextResponse.json({ error: 'Invalid submission data' }, { status: 400 })
    }

    const { responses } = submission as { responses: QuestionnaireResponses }

    // Format the responses with proper typing
    const formattedResponses: { userPreferences: UserPreferences } = {
      userPreferences: {
        doctorChoice: { value: Number(responses.doctor_choice) || 0 },
        managedCare: { value: Number(responses.managed_care) || 0 },
        domesticTravel: { value: Number(responses.domestic_travel) || 0 },
        yearlyMaximums: { value: Number(responses.yearly_maximums) || 0 },
        monthlyPremiums: { value: Number(responses.monthly_premiums) || 0 },
        prescriptionPlans: { value: Number(responses.prescription_plans) || 0 },
        dentalVision: { value: Number(responses.dental_vision?.value) || 0 }
      }
    }

    console.log('[API] Formatted responses for scoring:', formattedResponses)

    // Validate input
    try {
      validateInput(formattedResponses.userPreferences)
      console.log('[API] Input validation passed')
    } catch (validationError) {
      console.error('[API] Input validation failed:', validationError)
      return NextResponse.json({ error: 'Invalid user preferences data' }, { status: 400 })
    }

    // Calculate recommendation
    const scoringResults = await calculateScore(formattedResponses.userPreferences)
    console.log('[API] Scoring results:', scoringResults)

    // Create new recommendation record
    const recommendation = await payload.create({
      collection: 'recommendations',
      data: {
        user: responses.name || 'Anonymous',
        userPreferences: formattedResponses.userPreferences,
        scoringResults,
        recommendations: [], // Empty array for initial creation
        status: 'active',
        metadata: {
          createdAt: new Date().toISOString(),
          lastViewed: new Date().toISOString(),
          source: 'Questionnaire'
        }
      }
    })

    console.log('[API] Created recommendation:', recommendation)
    return NextResponse.json(recommendation)

  } catch (error) {
    console.error('[API] Detailed Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    )
  }
  }
