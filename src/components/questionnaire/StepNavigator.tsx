// src/components/questionnaire/StepNavigator.tsx

import React from 'react';
import { steps } from './form-config';

interface StepNavigatorProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const StepNavigator: React.FC<StepNavigatorProps> = ({ currentStep, onNext, onBack, isSubmitting }) => {
  return (
    <div className="flex justify-between mt-8">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 0}
        className={`px-4 py-2 rounded transition-colors ${
          currentStep === 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#005EB8] hover:bg-gray-100'
        }`}
      >
        ← Back
      </button>

      {/* Progress Bar */}
      <div className="flex-1 mx-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-[#005EB8] rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Next/Submit Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className={`bg-[#005EB8] hover:bg-[#003F7A] text-white px-6 py-2 rounded transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting
          ? 'Submitting...'
          : currentStep === steps.length - 1
          ? 'Submit'
          : 'Next →'}
      </button>
    </div>
  );
};

export default StepNavigator;
