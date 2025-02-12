// src/components/questionnaire/Steps/AboutYouStep.tsx

import React from 'react';
import { useFormContext } from 'react-hook-form';

const AboutYouStep: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name?.message && (
          <p className="mt-1 text-sm text-red-600">{String(errors.name.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.city?.message && (
            <p className="text-sm text-red-600">{String(errors.city.message)}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            {...register('state', { required: 'State is required' })}
            className="block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.state?.message && (
            <p className="text-sm text-red-600">{String(errors.state.message)}</p>
          )}
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
          <input
            {...register('zip')}
            className="block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutYouStep;
