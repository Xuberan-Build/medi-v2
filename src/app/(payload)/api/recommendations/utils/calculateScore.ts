// src/app/(payload)/api/recommendations/utils/calculateScore.ts
import { UserPreferences } from '../types'
import { validateInput } from './validateInput'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

// Define dimension weights
const DIMENSION_WEIGHTS = {
  provider: 0.25,
  cost: 0.2,
  health: 0.15,
  travel: 0.15,
  prescriptions: 0.1,
  benefits: 0.1,
  managed: 0.05,
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
    travel: calculateTravelScore(preferences),
    prescriptions: calculatePrescriptionScore(preferences),
    benefits: calculateBenefitsScore(preferences),
    managed: calculateManagedCareScore(preferences),
  }
  console.log('[calculateScore] Calculated dimension scores:', dimensionScores)

  // Use the new getPayload approach as per payload CMS docs
  const payload = await getPayload({ config: payloadConfig })

  if (!payload) {
    console.error('[calculateScore] Failed to initialize Payload')
    throw new Error('Payload initialization failed')
  }

  // Fetch active segments
  let segments
  try {
    segments = await payload.find({
      collection: 'segments',
      where: { status: { equals: 'published' } },
    })
    console.log(`[calculateScore] Fetched ${segments.docs.length} active segments`)
  } catch (error) {
    console.error('[calculateScore] Error fetching segments:', error)
    throw new Error('Failed to fetch segments')
  }

  // Calculate segment matches
  const segmentMatches = segments.docs.map((segment) => {
    const score = calculateSegmentScore(dimensionScores)
    const confidence = calculateConfidence(score)
    console.log(
      `[calculateScore] Segment ID: ${segment.id}, Score: ${score}, Confidence: ${confidence}`,
    )
    return { segment: segment.id, score, confidence }
  })

  // Sort segment matches by score in descending order
  segmentMatches.sort((a, b) => b.score - a.score)

  console.log('[calculateScore] Final segment matches:', segmentMatches)

  return {
    dimensionScores,
    segmentMatches,
  }
}

// Helper functions for score calculations with added logging

// Fix: Added check for value === 0 to return 0
function calculateProviderScore(preferences: UserPreferences) {
  const { doctorChoice, managedCare } = preferences

  // If rating is 0 (no preference), score is 0
  if (doctorChoice.value === 0 || managedCare.value === 0) {
    console.log('[calculateProviderScore] Rating is 0, score: 0')
    return 0
  }

  const score = (doctorChoice.value * 0.6 + managedCare.value * 0.4) * 20
  console.log('[calculateProviderScore] Score:', score)
  return score
}

// Fix: Added check for value === 0 to return 0
function calculateCostScore(preferences: UserPreferences) {
  const { monthlyPremiums, yearlyMaximums } = preferences

  // If rating is 0 (no preference), score is 0
  if (monthlyPremiums.value === 0 || yearlyMaximums.value === 0) {
    console.log('[calculateCostScore] Rating is 0, score: 0')
    return 0
  }

  const score = (monthlyPremiums.value * 0.7 + yearlyMaximums.value * 0.3) * 20
  console.log('[calculateCostScore] Score:', score)
  return score
}

// Fix: Added check for value === 0 to return 0
function calculateHealthScore(preferences: UserPreferences) {
  const { domesticTravel, yearlyMaximums } = preferences

  // If rating is 0 (no preference), score is 0
  if (domesticTravel.value === 0 || yearlyMaximums.value === 0) {
    console.log('[calculateHealthScore] Rating is 0, score: 0')
    return 0
  }

  const score = (domesticTravel.value * 0.3 + yearlyMaximums.value * 0.7) * 20
  console.log('[calculateHealthScore] Score:', score)
  return score
}

// Fix: Added check for value === 0 to return 0
function calculateTravelScore(preferences: UserPreferences) {
  const { domesticTravel } = preferences

  // If rating is 0 (no preference), score is 0
  if (domesticTravel.value === 0) {
    console.log('[calculateTravelScore] Rating is 0, score: 0')
    return 0
  }

  // Fixed inversion formula
  // 5 (frequent travel) should favor Medicare Supplement (high score)
  // 1 (rare travel) should favor Medicare Advantage (low score)
  const score = domesticTravel.value * 20
  console.log('[calculateTravelScore] Score:', score)
  return score
}

// Fix: Added check for value === 0 to return 0
function calculatePrescriptionScore(preferences: UserPreferences) {
  const { prescriptionPlans } = preferences

  // If rating is 0 (no preference), score is 0
  if (prescriptionPlans.value === 0) {
    console.log('[calculatePrescriptionScore] Rating is 0, score: 0')
    return 0
  }

  const score = prescriptionPlans.value * 20
  console.log('[calculatePrescriptionScore] Score:', score)
  return score
}

// Fix: Added check for value === 0 to return 0
function calculateBenefitsScore(preferences: UserPreferences) {
  const { dentalVision } = preferences

  // If rating is 0 (no preference), score is 0
  if (dentalVision.value === 0) {
    console.log('[calculateBenefitsScore] Rating is 0, score: 0')
    return 0
  }

  const score = dentalVision.value * 20
  console.log('[calculateBenefitsScore] Score:', score)
  return score
}

// Fix: Added check for value === 0 to return 0
function calculateManagedCareScore(preferences: UserPreferences) {
  const { managedCare } = preferences

  // If rating is 0 (no preference), score is 0
  if (managedCare.value === 0) {
    console.log('[calculateManagedCareScore] Rating is 0, score: 0')
    return 0
  }

  const score = managedCare.value * 20
  console.log('[calculateManagedCareScore] Score:', score)
  return score
}

function calculateSegmentScore(dimensionScores: Record<string, number>) {
  const score = Object.entries(dimensionScores).reduce((total, [dimension, score]) => {
    const weight = DIMENSION_WEIGHTS[dimension as keyof typeof DIMENSION_WEIGHTS]
    return total + score * weight
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
