import React from 'react'

interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxFieldProps {
  id: string
  label: string
  options: CheckboxOption[]
  values: string[]
  onChange: (values: string[]) => void
  error?: string
  required?: boolean
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  options,
  values,
  onChange,
  error,
  required
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...values, optionValue])
    } else {
      onChange(values.filter(v => v !== optionValue))
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={`${id}-${option.value}`}
              checked={values.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default CheckboxField
