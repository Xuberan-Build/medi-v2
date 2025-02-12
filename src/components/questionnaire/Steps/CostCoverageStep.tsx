// src/components/questionnaire/Steps/CostCoverageStep.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';

const PREMIUM_OPTIONS = [
  { value: "5", label: "Higher premium, lower out-of-pocket" },
  { value: "3", label: "Balanced approach" },
  { value: "1", label: "Lower premium, higher out-of-pocket" },
  { value: "0", label: "Not sure" }
];

const PRESCRIPTION_OPTIONS = [
  { value: "5", label: "Many medications" },
  { value: "4", label: "Some brand-name medications" },
  { value: "2", label: "Few generic medications" },
  { value: "1", label: "No regular prescriptions" }
];

const CostCoverageStep: React.FC = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const monthlyPremiums = watch('monthly_premiums', '');
  const prescriptionPlans = watch('prescription_plans', '');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          How do you feel about monthly premiums vs. out-of-pocket costs?
        </label>
        <div className="space-y-2">
          {PREMIUM_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('monthly_premiums', { required: 'Premium selection is required' })}
                value={option.value}
                checked={monthlyPremiums === option.value}
                onChange={() => setValue('monthly_premiums', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          {errors.monthly_premiums?.message && (
            <p className="text-sm text-red-600">{String(errors.monthly_premiums.message)}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          What are your prescription drug needs?
        </label>
        <div className="space-y-2">
          {PRESCRIPTION_OPTIONS.map(option => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('prescription_plans', { required: 'Prescription selection is required' })}
                value={option.value}
                checked={prescriptionPlans === option.value}
                onChange={() => setValue('prescription_plans', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
          {errors.prescription_plans?.message && (
            <p className="text-sm text-red-600">{String(errors.prescription_plans.message)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostCoverageStep;
