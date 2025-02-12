// src/components/questionnaire/Steps/HealthcareUsageStep.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';

const FREQUENCY_OPTIONS = [
  { value: "5", label: "Frequently (12+/year)" },
  { value: "4", label: "Regularly (7-12/year)" },
  { value: "3", label: "Occasionally (3-6/year)" },
  { value: "1", label: "Rarely (1-2/year)" }
];

const TRAVEL_OPTIONS = [
  { value: "5", label: "International travel" },
  { value: "3", label: "Travel within US" },
  { value: "1", label: "Rarely travel" },
  { value: "0", label: "No travel needs" }
];

const HealthcareUsageStep: React.FC = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const yearlyMaximums = watch('yearly_maximums', '');
  const domesticTravel = watch('domestic_travel', '');

  return (
    <div className="space-y-6">
      {/* Healthcare Frequency Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          How often do you typically need medical care?
        </label>
        <div className="space-y-2">
          {FREQUENCY_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('yearly_maximums', { required: 'Please select your healthcare usage frequency' })}
                value={option.value}
                checked={yearlyMaximums === option.value}
                onChange={() => setValue('yearly_maximums', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          {errors.yearly_maximums?.message && (
            <p className="text-sm text-red-600">{String(errors.yearly_maximums.message)}</p>
          )}
        </div>
      </div>

      {/* Travel Coverage Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Do you need coverage while traveling?
        </label>
        <div className="space-y-2">
          {TRAVEL_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('domestic_travel', { required: 'Please select your travel coverage preference' })}
                value={option.value}
                checked={domesticTravel === option.value}
                onChange={() => setValue('domestic_travel', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          {errors.domestic_travel?.message && (
            <p className="text-sm text-red-600">{String(errors.domestic_travel.message)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthcareUsageStep;
