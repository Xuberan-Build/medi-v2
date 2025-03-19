// src/components/questionnaire/QuestionnaireForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { steps } from './form-config';
import StepNavigator from './StepNavigator';

const QuestionnaireForm: React.FC = () => {
  const router = useRouter();
  const methods = useForm();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const StepComponent = steps[step].component;

  const handleNext = async () => {
    const isValid = await methods.trigger(steps[step].fields);
    if (!isValid) return;

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submissionData = methods.getValues();
      const response = await fetch('/api/questionnaires/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses: submissionData }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      const result = await response.json();
      sessionStorage.setItem('questionnaireResponses', JSON.stringify({
        responses: submissionData,
        id: result.id,
        timestamp: new Date().toISOString(),
      }));
      router.push(`/recommendations?id=${result.id}`);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#005EB8] mb-4">Medicare Plan Finder</h1>
        <p className="text-gray-600 mb-6">{steps[step].description}</p>
        <StepComponent />
        <StepNavigator
          currentStep={step}
          onNext={handleNext}
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      </form>
    </FormProvider>
  );
};

export default QuestionnaireForm;
