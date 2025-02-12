// src/components/questionnaire/fields/TextField.tsx

import React from 'react'
import type { FormInputValue } from '../QuestionnaireForm/types'

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (field: string, value: FormInputValue) => void
  error?: string
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  required?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  required
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        required={required}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default TextField
