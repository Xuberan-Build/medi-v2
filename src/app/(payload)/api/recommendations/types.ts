// src/app/(payload)/api/recommendations/types.ts


// Add this interface for the questionnaire responses
export interface QuestionnaireResponses {
  name: string;
  city: string;
  state: string;
  zip: string;
  doctor_choice: string;
  managed_care: string;
  yearly_maximums: string;
  domestic_travel: string;
  monthly_premiums: string;
  prescription_plans: string;
  dental_vision: {
    value: number;
  };
  extraBenefits?: string[];
  email: string;
  phone_number: string;
}

export interface Submission {
  id: string;
  responses: QuestionnaireResponses;
  status: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

// Your existing interfaces
export interface PreferenceValue {
  value: number;
  comments?: string | null;
}

export interface UserPreferences {
  doctorChoice: PreferenceValue;
  managedCare: PreferenceValue;
  domesticTravel: PreferenceValue;
  yearlyMaximums: PreferenceValue;
  monthlyPremiums: PreferenceValue;
  prescriptionPlans: PreferenceValue;
  dentalVision: PreferenceValue;
}
