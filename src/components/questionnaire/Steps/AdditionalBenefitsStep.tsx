// src/components/questionnaire/Steps/AdditionalBenefitsStep.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';

const BENEFITS = [
  { value: 'dental', label: 'Dental coverage' },
  { value: 'vision', label: 'Vision coverage' },
  { value: 'hearing', label: 'Hearing aids' },
  { value: 'fitness', label: 'Fitness membership' },
  { value: 'transportation', label: 'Transportation to medical appointments' },
  { value: 'meal-delivery', label: 'Meal delivery after hospital stays' }
];

const AdditionalBenefitsStep: React.FC = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const selectedBenefits = watch('extraBenefits', []);

  const handleBenefitChange = (benefit: string, isChecked: boolean) => {
    const newBenefits: string[] = isChecked
      ? [...selectedBenefits, benefit]
      : selectedBenefits.filter((b: string) => b !== benefit);

    setValue('extraBenefits', newBenefits);

    // Auto-update 'dental_vision' based on selected benefits
    const hasDentalOrVision = newBenefits.some((b: string) => ['dental', 'vision'].includes(b));
    setValue('dental_vision', { value: hasDentalOrVision ? 5 : 1 });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Which additional benefits interest you? (Select all that apply)
        </label>
        <div className="space-y-3">
          {BENEFITS.map(benefit => (
            <label key={benefit.value} className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('extraBenefits')}
                checked={selectedBenefits.includes(benefit.value)}
                onChange={(e) => handleBenefitChange(benefit.value, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-sm text-gray-700">{benefit.label}</span>
            </label>
          ))}
        </div>
        {errors.extraBenefits && (
          <p className="mt-2 text-sm text-red-600">{String(errors.extraBenefits.message)}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="your@email.com"
          />
          {errors.email?.message && (
            <p className="mt-1 text-sm text-red-600">{String(errors.email.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            {...register('phone_number', { required: 'Phone number is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="(xxx) xxx-xxxx"
          />
          {errors.phone_number?.message && (
            <p className="mt-1 text-sm text-red-600">{String(errors.phone_number.message)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalBenefitsStep;
