/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { Step, FormData, FormInputValue, ValidationErrors } from '@/components/questionnaire/QuestionnaireForm/types';
import AboutYouStep from '@/components/questionnaire/Steps/AboutYouStep';
import DoctorPreferencesStep from '@/components/questionnaire/Steps/DoctorPreferencesStep';
import HealthcareUsageStep from '@/components/questionnaire/Steps/HealthcareUsageStep';
import CostCoverageStep from '@/components/questionnaire/Steps/CostCoverageStep';
import AdditionalBenefitsStep from '@/components/questionnaire/Steps/AdditionalBenefitsStep';

export const steps: Step[] = [
  {
    title: 'About You',
    description: "Let's start with some basic information",
    fields: (formData: FormData, handleInputChange, errors) => 
      <AboutYouStep />
  },
  {
    title: 'Doctor Preferences',
    description: 'Tell us about your healthcare provider preferences',
    fields: (formData, handleInputChange, errors) => 
      <DoctorPreferencesStep />
  },
  {
    title: 'Healthcare Usage',
    description: 'Help us understand your healthcare needs',
    fields: (formData, handleInputChange, errors) => 
      <HealthcareUsageStep />
  },
  {
    title: 'Cost Coverage',
    description: "Let's understand your preferences for costs and coverage",
    fields: (formData, handleInputChange, errors) => 
      <CostCoverageStep />
  },
  {
    title: 'Additional Benefits',
    description: 'Select any additional benefits that interest you',
    fields: (formData, handleInputChange, errors) => 
      <AdditionalBenefitsStep />
  }
];
