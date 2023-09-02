import { useCallback, useState, useEffect } from 'react';
import { useFieldValidation } from './useValidationTest';

export function useValidation(initialState) {
  const [values, setValues] = useState(initialState);
  const [isValid, setIsValid] = useState(false);

  const { errors, validateField } = useFieldValidation();

  const handleInputChange = (fieldName, value) => {
    const newValues = { ...values };
    newValues[fieldName] = value;
    setValues(newValues);
    validateField(fieldName, value);
  };

  const isFormValid = useCallback(() => {
    const errorValues = Object.values(errors);
    return errorValues.every((error) => error === '') && Object.values(values).every((value) => value.trim() !== '');
  }, [errors, values]);

  useEffect(() => {
    setIsValid(isFormValid());
  }, [values, errors, isFormValid]);

  return { values, errors, isValid, handleInputChange, setValues, setIsValid };
}
