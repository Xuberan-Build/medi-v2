// src/app/(payload)/api/recommendations/utils/validateInput.ts
import { UserPreferences } from '../types'

export function validateInput(preferences: UserPreferences) {
  console.log('[validateInput] Validating input')

  const requiredFields = [
    'doctorChoice',
    'managedCare',
    'domesticTravel',
    'yearlyMaximums',
    'monthlyPremiums',
    'prescriptionPlans',
    'dentalVision',
  ]

  // Changed the validation to allow 0 values (for no preference)
  const missingFields = requiredFields.filter((field) => {
    const value = preferences[field as keyof UserPreferences]?.value
    // Allow values 0-5 instead of 1-5
    if (value === undefined || value < 0 || value > 5) {
      console.warn(`[validateInput] Missing or invalid field: ${field}, value: ${value}`)
      return true
    }
    return false
  })

  if (missingFields.length > 0) {
    const errorMessage = `Missing or invalid fields: ${missingFields.join(', ')}`
    console.error('[validateInput] Error:', errorMessage)
    throw new Error(errorMessage)
  }

  console.log('[validateInput] Input validated successfully')
  return true
}
