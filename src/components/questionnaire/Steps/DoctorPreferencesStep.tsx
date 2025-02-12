// src/components/questionnaire/Steps/DoctorPreferencesStep.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';

const DOCTOR_CHOICE_OPTIONS = [
  { value: "5", label: "Must keep current doctors" },
  { value: "4", label: "Prefer to keep but flexible" },
  { value: "3", label: "Open to new doctors" },
  { value: "0", label: "No preference" }
];

const MANAGED_CARE_OPTIONS = [
  { value: "5", label: "Prefer direct access" },
  { value: "3", label: "OK with referrals" },
  { value: "1", label: "No preference" },
  { value: "0", label: "Not sure" }
];

const DoctorPreferencesStep: React.FC = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const doctorChoice = watch('doctor_choice', '');
  const managedCare = watch('managed_care', '');

  return (
    <div className="space-y-6">
      {/* Doctor Choice Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          How important is keeping your current doctors?
        </label>
        <div className="space-y-2">
          {DOCTOR_CHOICE_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('doctor_choice', { required: 'Doctor preference is required' })}
                value={option.value}
                checked={doctorChoice === option.value}
                onChange={() => setValue('doctor_choice', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          {errors.doctor_choice?.message && (
            <p className="text-sm text-red-600">{String(errors.doctor_choice.message)}</p>
          )}
        </div>
      </div>

      {/* Managed Care Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          How do you feel about referrals for specialists?
        </label>
        <div className="space-y-2">
          {MANAGED_CARE_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('managed_care', { required: 'Referral preference is required' })}
                value={option.value}
                checked={managedCare === option.value}
                onChange={() => setValue('managed_care', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          {errors.managed_care?.message && (
            <p className="text-sm text-red-600">{String(errors.managed_care.message)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPreferencesStep;
