// src/components/questionnaire/QuestionnaireForm/types.ts
import React from 'react'

export interface Location {
  city: string
  state: string
  zip: string
}

export interface FormResponse {
  value: number
}

export interface FormData {
  doctor_choice: FormResponse
  managed_care: FormResponse
  domestic_travel: FormResponse
  yearly_maximums: FormResponse
  monthly_premiums: FormResponse
  prescription_plans: FormResponse
  dental_vision: FormResponse
  email: string
  name: string
  city: string
  state: string
  phone_number: string
  currentPlan: string
  location: Location
  extraBenefits: string[]
  situation?: string
}

export type FormInputValue = string | number | string[] | Location | FormResponse

export interface ValidationErrors {
  [key: string]: string
}

export interface Step {
  title: string
  description: string
  fields: (
    formData: FormData,
    handleInputChange: (field: keyof FormData, value: FormInputValue) => void,
    errors: ValidationErrors
  ) => React.ReactNode
}

export interface QuestionnaireSubmissionResponse {
  id: string
  responses: FormData
  created_at: string
  status: 'started' | 'completed'
}
