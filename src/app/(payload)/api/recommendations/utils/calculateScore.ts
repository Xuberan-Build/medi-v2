// src/app/(payload)/api/recommendations/utils/calculateScore.ts
import { UserPreferences } from '../types'
import { validateInput } from './validateInput'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'  // Make sure to provide the correct path to your config
import { NextResponse } from 'next/server'

const DIMENSION_WEIGHTS = {
  provider: 0.25,
  cost: 0.2,
  health: 0.2,
  prescriptions: 0.2,
  benefits: 0.15
}

export async function calculateScore(preferences: UserPreferences) {
  console.log('[calculateScore] Starting score calculation')

  // Validate input
  try {
    validateInput(preferences)
    console.log('[calculateScore] Input validation passed')
  } catch (validationError) {
    console.error('[calculateScore] Input validation failed:', validationError)
    throw validationError
  }

  // Calculate dimension scores
  const dimensionScores = {
    provider: calculateProviderScore(preferences),
    cost: calculateCostScore(preferences),
    health: calculateHealthScore(preferences),
    prescriptions: calculatePrescriptionScore(preferences),
    benefits: calculateBenefitsScore(preferences)
  }
  console.log('[calculateScore] Calculated dimension scores:', dimensionScores)
   const payload = await getPayload({ config: payloadConfig })

    if (!payload) {
      console.error('[API] Failed to initialize Payload')
      return NextResponse.json({ error: 'Payload initialization failed' }, { status: 500 })
    }
  // Fetch active segments
  let segments
  try {
    segments = await payload.find({
      collection: 'segments',
      where: { status: { equals: 'active' } }
    })
    console.log(`[calculateScore] Fetched ${segments.docs.length} active segments`)
  } catch (error) {
    console.error('[calculateScore] Error fetching segments:', error)
    throw new Error('Failed to fetch segments')
  }

  // Calculate segment matches
  const segmentMatches = segments.docs.map(segment => {
    const score = calculateSegmentScore(dimensionScores)
    const confidence = calculateConfidence(score)
    console.log(`[calculateScore] Segment ID: ${segment.id}, Score: ${score}, Confidence: ${confidence}`)
    return { segment: segment.id, score, confidence }
  })

  // Sort segment matches by score in descending order
  segmentMatches.sort((a, b) => b.score - a.score)

  console.log('[calculateScore] Final segment matches:', segmentMatches)

  return {
    dimensionScores,
    segmentMatches
  }
}

// Helper functions for score calculations with added logging
function calculateProviderScore(preferences: UserPreferences) {
  const { doctorChoice, managedCare } = preferences
  const score = (doctorChoice.value * 0.6 + managedCare.value * 0.4) * 20
  console.log('[calculateProviderScore] Score:', score)
  return score
}

function calculateCostScore(preferences: UserPreferences) {
  const { monthlyPremiums, yearlyMaximums } = preferences
  const score = (monthlyPremiums.value * 0.7 + yearlyMaximums.value * 0.3) * 20
  console.log('[calculateCostScore] Score:', score)
  return score
}

function calculateHealthScore(preferences: UserPreferences) {
  const { domesticTravel, yearlyMaximums } = preferences
  const score = (domesticTravel.value * 0.3 + yearlyMaximums.value * 0.7) * 20
  console.log('[calculateHealthScore] Score:', score)
  return score
}

function calculatePrescriptionScore(preferences: UserPreferences) {
  const score = preferences.prescriptionPlans.value * 20
  console.log('[calculatePrescriptionScore] Score:', score)
  return score
}

function calculateBenefitsScore(preferences: UserPreferences) {
  const score = preferences.dentalVision.value * 20
  console.log('[calculateBenefitsScore] Score:', score)
  return score
}

function calculateSegmentScore(
  dimensionScores: Record<string, number>
) {
  const score = Object.entries(dimensionScores).reduce((total, [dimension, score]) => {
    const weight = DIMENSION_WEIGHTS[dimension as keyof typeof DIMENSION_WEIGHTS]
    return total + (score * weight)
  }, 0)
  console.log('[calculateSegmentScore] Segment score:', score)
  return score
}

function calculateConfidence(score: number): number {
  let confidence = 0.2
  if (score >= 80) confidence = 1
  else if (score >= 60) confidence = 0.7
  else if (score >= 40) confidence = 0.4
  console.log('[calculateConfidence] Confidence level:', confidence)
  return confidence
}
