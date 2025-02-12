// src/components/questionnaire/fields/RadioField.tsx

import React from 'react'
import type { FormInputValue } from '../QuestionnaireForm/types'

interface RadioOption {
  value: string
  label: string
}

interface RadioFieldProps {
  id: string
  label: string
  options: RadioOption[]
  value: string
  onChange: (field: string, value: FormInputValue) => void
  error?: string
  required?: boolean
}

const RadioField: React.FC<RadioFieldProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  required
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="inline-flex flex-wrap gap-3">
        {options.map((option) => (
          <div key={option.value} className="relative">
            <label
              className={`
                inline-flex items-center px-3 py-1.5 border rounded-md cursor-pointer
                transition-colors duration-200 text-sm
                ${value === option.value
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                }
              `}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(id, { value: parseInt(e.target.value) })}
                className="absolute opacity-0"
                required={required}
              />
              <span className="font-medium">
                {option.label}
              </span>
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default RadioField
