// src/config/questionnaire-steps.ts
import type { FormData, FormInputValue, Step } from '../components/questionnaire/QuestionnaireForm/types'
import AboutYouStep from '../components/questionnaire/Steps/AboutYouStep'
import DoctorPreferencesStep from '../components/questionnaire/Steps/DoctorPreferencesStep'
import HealthcareUsageStep from '../components/questionnaire/Steps/HealthcareUsageStep'
import CostCoverageStep from '../components/questionnaire/Steps/CostCoverageStep'
import AdditionalBenefitsStep from '../components/questionnaire/Steps/AdditionalBenefitsStep'

export const steps: Step[] = [
  {
    title: 'About You',
    description: "Let's start with some basic information",
    fields: (formData: FormData, handleInputChange: (field: keyof FormData, value: FormInputValue) => void, errors: any) =>
      AboutYouStep({ formData, handleInputChange, errors })
  },
  {
    title: 'Doctor Preferences',
    description: 'Tell us about your healthcare provider preferences',
    fields: (formData: FormData, handleInputChange: (field: keyof FormData, value: FormInputValue) => void, errors: any) =>
      DoctorPreferencesStep({ formData, handleInputChange, errors })
  },
  {
    title: 'Healthcare Usage',
    description: 'Help us understand your healthcare needs',
    fields: (formData: FormData, handleInputChange: (field: keyof FormData, value: FormInputValue) => void, errors: any) =>
      HealthcareUsageStep({ formData, handleInputChange, errors })
  },
  {
    title: 'Cost Coverage',
    description: "Let's understand your preferences for costs and coverage",
    fields: (formData: FormData, handleInputChange: (field: keyof FormData, value: FormInputValue) => void, errors: any) =>
      CostCoverageStep({ formData, handleInputChange, errors })
  },
  {
    title: 'Additional Benefits',
    description: 'Select any additional benefits that interest you',
    fields: (formData: FormData, handleInputChange: (field: keyof FormData, value: FormInputValue) => void, errors: any) =>
      AdditionalBenefitsStep({ formData, handleInputChange, errors })
  }
]

export type { Step }
