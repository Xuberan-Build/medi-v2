'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FormData, FormInputValue, ValidationErrors } from './types'
import { steps } from '@/components/questionnaire/form-config'

const INITIAL_FORM_DATA: FormData = {
  doctor_choice: { value: 0 },
  managed_care: { value: 0 },
  domestic_travel: { value: 0 },
  yearly_maximums: { value: 0 },
  monthly_premiums: { value: 0 },
  prescription_plans: { value: 0 },
  dental_vision: { value: 0 },
  email: '',
  name: '',
  city: '',
  state: '',
  phone_number: '',
  currentPlan: '',
  location: { city: '', state: '', zip: '' },
  extraBenefits: [],
  situation: '',
}

export default function QuestionnaireForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const handleInputChange = (field: keyof FormData, value: FormInputValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))

    // Clear validation error for the field when it changes
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    switch (stepIndex) {
      case 0: // About You
        if (!formData.name) {
          newErrors.name = 'Name is required'
          isValid = false
        }
        if (!formData.location.city || !formData.location.state) {
          newErrors.location = 'City and state are required'
          isValid = false
        }
        break

      case 1: // Doctor Preferences
        if (formData.doctor_choice.value === 0) {
          newErrors.doctor_choice = 'Please select your doctor preference'
          isValid = false
        }
        if (formData.managed_care.value === 0) {
          newErrors.managed_care = 'Please select your referral preference'
          isValid = false
        }
        break

      case 2: // Healthcare Usage
        if (formData.yearly_maximums.value === 0) {
          newErrors.yearly_maximums = 'Please select your healthcare frequency'
          isValid = false
        }
        if (formData.domestic_travel.value === 0) {
          newErrors.domestic_travel = 'Please select your travel needs'
          isValid = false
        }
        break

      case 3: // Cost Coverage
        if (formData.monthly_premiums.value === 0) {
          newErrors.monthly_premiums = 'Please select your premium preference'
          isValid = false
        }
        if (formData.prescription_plans.value === 0) {
          newErrors.prescription_plans = 'Please select your prescription needs'
          isValid = false
        }
        break

      case 4: // Additional Benefits
        if (!formData.email) {
          newErrors.email = 'Email is required'
          isValid = false
        }
        if (!formData.phone_number) {
          newErrors.phone_number = 'Phone number is required'
          isValid = false
        }
        break
    }

    setValidationErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
    // Clear validation errors when going back
    setValidationErrors({})
  }

  const prepareSubmissionData = () => {
    return {
      doctor_choice: { value: formData.doctor_choice.value },
      managed_care: { value: formData.managed_care.value },
      domestic_travel: { value: formData.domestic_travel.value },
      yearly_maximums: { value: formData.yearly_maximums.value },
      monthly_premiums: { value: formData.monthly_premiums.value },
      prescription_plans: { value: formData.prescription_plans.value },
      dental_vision: { value: formData.dental_vision.value },
      email: formData.email,
      name: formData.name,
      city: formData.location.city,
      state: formData.location.state,
      phone_number: formData.phone_number,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step !== steps.length - 1) {
      handleNext()
      return
    }

    if (!validateStep(step)) {
      setError('Please fill out all required fields')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const submissionData = { responses: prepareSubmissionData() }

      const response = await fetch('/api/questionnaires/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to submit questionnaire')
      }

      const result = await response.json()

      sessionStorage.setItem(
        'questionnaireResponses',
        JSON.stringify({
          responses: submissionData,
          id: result.id,
          timestamp: new Date().toISOString(),
        })
      )

      router.push(`/recommendations?id=${result.id}`)
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#005EB8]">Medicare Plan Finder</h1>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{steps[step].title}</h2>
            <span className="text-sm text-gray-500">
              Step {step + 1} of {steps.length}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#005EB8] rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-6">{steps[step].description}</p>
          {/* {steps[step].fields(formData, handleInputChange, validationErrors)} */}
          </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className={`px-4 py-2 rounded transition-colors ${
              step === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#005EB8] hover:bg-gray-100'
            }`}
          >
            ← Back
          </button>

          <button
            type={step === steps.length - 1 ? 'submit' : 'button'}
            onClick={step === steps.length - 1 ? undefined : handleNext}
            disabled={isSubmitting}
            className={`bg-[#005EB8] hover:bg-[#003F7A] text-white px-6 py-2 rounded transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting
              ? 'Submitting...'
              : step === steps.length - 1
              ? 'Submit'
              : 'Next →'}
          </button>
        </div>
      </div>
    </form>
  )
}
