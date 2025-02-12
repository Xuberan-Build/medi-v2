// src/components/questionnaire/form-config.ts

import AboutYouStep from './Steps/AboutYouStep';
import DoctorPreferencesStep from './Steps/DoctorPreferencesStep';
import HealthcareUsageStep from './Steps/HealthcareUsageStep';
import CostCoverageStep from './Steps/CostCoverageStep';
import AdditionalBenefitsStep from './Steps/AdditionalBenefitsStep';

/** Step Definitions */
export const steps = [
  {
    id: "about-you",
    title: "About You",
    description: "Tell us about yourself.",
    component: AboutYouStep,
    fields: ["name", "city", "state", "email", "phone_number", "currentPlan"],
  },
  {
    id: "doctor-preferences",
    title: "Doctor Preferences",
    description: "Choose your preferred doctors and care model.",
    component: DoctorPreferencesStep,
    fields: ["doctor_choice", "managed_care"],
  },
  {
    id: "healthcare-usage",
    title: "Healthcare Usage",
    description: "How often do you visit healthcare providers?",
    component: HealthcareUsageStep,
    fields: ["yearly_maximums", "domestic_travel"],
  },
  {
    id: "cost-coverage",
    title: "Cost Coverage",
    description: "Select your preferred cost structure.",
    component: CostCoverageStep,
    fields: ["monthly_premiums", "prescription_plans"],
  },
  {
    id: "additional-benefits",
    title: "Additional Benefits",
    description: "Do you need any extra benefits?",
    component: AdditionalBenefitsStep,
    fields: ["extraBenefits"],
  }
] as const;

/** Question Options */
export const DOCTOR_CHOICE_OPTIONS = [
  { value: "5", label: "Must keep current doctors" },
  { value: "4", label: "Prefer to keep but flexible" },
  { value: "3", label: "Open to new doctors" },
  { value: "0", label: "No preference" }
] as const;

export const MANAGED_CARE_OPTIONS = [
  { value: "5", label: "Prefer direct access" },
  { value: "3", label: "OK with referrals" },
  { value: "1", label: "No preference" },
  { value: "0", label: "Not sure" }
] as const;

export const FREQUENCY_OPTIONS = [
  { value: "5", label: "Frequently (12+/year)" },
  { value: "4", label: "Regularly (7-12/year)" },
  { value: "3", label: "Occasionally (3-6/year)" },
  { value: "1", label: "Rarely (1-2/year)" }
] as const;

export const TRAVEL_OPTIONS = [
  { value: "5", label: "International travel" },
  { value: "3", label: "Travel within US" },
  { value: "1", label: "Rarely travel" },
  { value: "0", label: "No travel needs" }
] as const;

export const PREMIUM_OPTIONS = [
  { value: "5", label: "Higher premium, lower out-of-pocket" },
  { value: "3", label: "Balanced approach" },
  { value: "1", label: "Lower premium, higher out-of-pocket" },
  { value: "0", label: "Not sure" }
] as const;

export const PRESCRIPTION_OPTIONS = [
  { value: "5", label: "Many medications" },
  { value: "4", label: "Some brand-name medications" },
  { value: "2", label: "Few generic medications" },
  { value: "1", label: "No regular prescriptions" }
] as const;

export const EXTRA_BENEFITS_OPTIONS = [
  { value: 'dental', label: 'Dental coverage' },
  { value: 'vision', label: 'Vision coverage' },
  { value: 'hearing', label: 'Hearing aids' },
  { value: 'fitness', label: 'Fitness membership' },
  { value: 'transportation', label: 'Transportation to medical appointments' },
  { value: 'meal-delivery', label: 'Meal delivery after hospital stays' }
] as const;
