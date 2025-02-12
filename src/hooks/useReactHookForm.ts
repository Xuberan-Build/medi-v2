// src/hooks/useReactHookForm.ts

import { useForm } from 'react-hook-form';

export const useReactHookForm = () => {
  return useForm({
    mode: 'onBlur', // Validates fields when they lose focus
    defaultValues: {}, // Default values can be set dynamically later
  });
};
