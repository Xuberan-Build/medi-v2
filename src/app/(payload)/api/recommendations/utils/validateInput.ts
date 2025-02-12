// src/app/(payload)/api/recommendations/utils/validateInput.ts
import { UserPreferences } from '../types';

export function validateInput(preferences: UserPreferences) {
  console.log('[validateInput] Validating input');

  const requiredFields = [
    'doctorChoice',
    'managedCare',
    'domesticTravel',
    'yearlyMaximums',
    'monthlyPremiums',
    'prescriptionPlans',
    'dentalVision',
  ];

  const missingFields = requiredFields.filter((field) => {
    const value = preferences[field as keyof UserPreferences]?.value;
    if (!value || value < 1 || value > 5) {
      console.warn(`[validateInput] Missing or invalid field: ${field}, value: ${value}`);
      return true;
    }
    return false;
  });

  if (missingFields.length > 0) {
    const errorMessage = `Missing or invalid fields: ${missingFields.join(', ')}`;
    console.error('[validateInput] Error:', errorMessage);
    throw new Error(errorMessage);
  }

  console.log('[validateInput] Input validated successfully');
  return true;
}
