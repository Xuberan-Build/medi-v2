/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(payload)/api/recommendations/calculate/route.ts

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import type { Submission } from '../types'
import {
  DimensionId,
  QuestionnaireResponse,
  RecommendationResult,
} from 'src/components/recommendations/engine/types'
import { prepareResponsesForScoring } from '@/components/recommendations/engine/validation'
import { calculateRecommendation } from '@/components/recommendations/engine/scoring'

export async function GET(req: any) {
  console.log('[API] Received request for recommendation calculation')

  try {
    const { searchParams } = new URL(req.url)
    const submissionId = searchParams.get('id')
    console.log(`[API] submissionId: ${submissionId}`)

    if (!submissionId) {
      console.error('[API] No submission ID provided')
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 })
    }

    // Initialize Payload instance
    const payload = await getPayload({ config: payloadConfig })

    if (!payload) {
      console.error('[API] Failed to initialize Payload')
      return NextResponse.json({ error: 'Payload initialization failed' }, { status: 500 })
    }

    // Fetch questionnaire responses
    const submission = (await payload.findByID({
      collection: 'Questionnaires',
      id: submissionId,
      depth: 2,
    })) as Submission | any

    console.log('[API] Fetched submission:', submission)

    if (!submission?.responses) {
      console.error('[API] Invalid or missing responses in submission')
      return NextResponse.json({ error: 'Invalid submission data' }, { status: 400 })
    }

    const responses = submission.responses

    const questionnaireResponses: QuestionnaireResponse[] = [
      { dimensionId: DimensionId.DOCTOR_CHOICE, rating: Number(responses.doctor_choice) },
      { dimensionId: DimensionId.MANAGED_CARE, rating: Number(responses.managed_care) },
      { dimensionId: DimensionId.HEALTHCARE_USAGE, rating: Number(responses.yearly_maximums) },
      { dimensionId: DimensionId.TRAVEL_NEEDS, rating: Number(responses.domestic_travel) },
      { dimensionId: DimensionId.COST_STRUCTURE, rating: Number(responses.monthly_premiums) },
      { dimensionId: DimensionId.PRESCRIPTION_NEEDS, rating: Number(responses.prescription_plans) },
      {
        dimensionId: DimensionId.ADDITIONAL_BENEFITS,
        rating: Number(responses.dental_vision.value),
      },
    ]

    console.log('[API] Raw Questionnaire Responses:', questionnaireResponses)

    // Validate and sanitize responses
    const validatedResponses = prepareResponsesForScoring(questionnaireResponses)
    if (!validatedResponses) {
      return NextResponse.json({ error: 'Invalid responses provided' }, { status: 400 })
    }

    console.log('[API] Validated Responses:', validatedResponses)

    // Calculate recommendation
    const recommendationResult: RecommendationResult = calculateRecommendation(validatedResponses)
    console.log('[API] Recommendation Result:', recommendationResult)

    // Extract dimension scores
    const dimensionScores = {
      provider:
        recommendationResult.primaryRecommendation.breakdown.find(
          (b) => b.dimensionId === DimensionId.DOCTOR_CHOICE,
        )?.score || 0,
      cost:
        recommendationResult.primaryRecommendation.breakdown.find(
          (b) => b.dimensionId === DimensionId.COST_STRUCTURE,
        )?.score || 0,
      health:
        recommendationResult.primaryRecommendation.breakdown.find(
          (b) => b.dimensionId === DimensionId.HEALTHCARE_USAGE,
        )?.score || 0,
      prescriptions:
        recommendationResult.primaryRecommendation.breakdown.find(
          (b) => b.dimensionId === DimensionId.PRESCRIPTION_NEEDS,
        )?.score || 0,
      benefits:
        recommendationResult.primaryRecommendation.breakdown.find(
          (b) => b.dimensionId === DimensionId.ADDITIONAL_BENEFITS,
        )?.score || 0,
    }

    // Fetch plan IDs based on their names
    const plans = await payload.find({
      collection: 'plans',
      where: {
        name: { in: ['Medicare Supplement', 'Medicare Advantage'] },
      },
    })

    const planIds: Record<string, string> = {}
    plans.docs.forEach((plan: any) => {
      planIds[plan.name] = plan.id
    })

    if (!planIds['Medicare Supplement'] || !planIds['Medicare Advantage']) {
      console.error('[API] One or both plans not found in the database.')
      return NextResponse.json(
        { error: 'Required plans not found in the database' },
        { status: 400 },
      )
    }

    // Prepare recommendations array for storage
    const recommendations = recommendationResult.primaryRecommendation
      ? [
          {
            plan: planIds[recommendationResult.primaryRecommendation.planType],
            matchScore: recommendationResult.primaryRecommendation.totalScore,
            isPrimary: true,
            reasonsForMatch: recommendationResult.primaryRecommendation.breakdown.map(
              (breakdown) => ({
                reason: `${breakdown.dimensionId} scored ${breakdown.score} contributing ${Math.round(breakdown.contribution)} points`,
              }),
            ),
          },
        ]
      : []

    if (recommendationResult.alternativeRecommendation) {
      recommendations.push({
        plan: planIds[recommendationResult.alternativeRecommendation.planType],
        matchScore: recommendationResult.alternativeRecommendation.totalScore,
        isPrimary: false,
        reasonsForMatch: recommendationResult.alternativeRecommendation.breakdown.map(
          (breakdown) => ({
            reason: `${breakdown.dimensionId} scored ${breakdown.score} contributing ${Math.round(breakdown.contribution)} points`,
          }),
        ),
      })
    }

    const segments = await payload.find({
      collection: 'segments',
      limit: 100,
    })

    const segmentMatches = segments.docs.map((segment: any) => ({
      segment: segment.id,
      score: 0,
      confidence: 0,
    }))

    // Create new recommendation record
    const recommendation = await payload.create({
      collection: 'recommendations',
      data: {
        userPreferences: {
          doctorChoice: { value: Number(responses.doctor_choice) },
          managedCare: { value: Number(responses.managed_care) },
          domesticTravel: { value: Number(responses.domestic_travel) || 0 },
          yearlyMaximums: { value: Number(responses.yearly_maximums) },
          monthlyPremiums: { value: Number(responses.monthly_premiums) },
          prescriptionPlans: { value: Number(responses.prescription_plans) },
          dentalVision: { value: Number(responses.dental_vision?.value) },
        },
        scoringResults: {
          dimensionScores,
          segmentMatches,
        },
        recommendations,
        status: 'active',
        metadata: {
          createdAt: new Date().toISOString(),
          lastViewed: new Date().toISOString(),
          source: 'Questionnaire',
        },
      },
    })

    console.log('[API] Created recommendation:', recommendation)
    return NextResponse.json(recommendationResult)
  } catch (error) {
    console.error('[API] Detailed Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 },
    )
  }
}
