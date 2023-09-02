import { useCallback, useState, useEffect } from 'react';
import { useFieldValidation } from './useValidationTest';

export function useValidationTEST(initialState) {
  const [values, setValues] = useState(initialState);
  // const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const { errors, validateField } = useFieldValidation();

  // const validateField = (fieldName, value) => {
  //   if (fieldName === 'name') {
  //     const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
  //     const isValidLength = value.length >= 3 && value.length <= 25;
  //     const isValidFormat = nameRegex.test(value);
  //     const newErrors = { ...errors };

  //     if (!isValidLength) {
  //       newErrors.name = 'Имя должно быть от 3 до 25 символов';
  //     } else if (!isValidFormat) {
  //       newErrors.name = 'Имя должно содержать только латиницу, кириллицу, пробел или дефис';
  //     } else {
  //       newErrors.name = '';
  //     }
  //     setErrors(newErrors);
  //   }

  //   if (fieldName === 'email') {
  //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //     const isValid = emailRegex.test(value);
  //     const newErrors = { ...errors };
  //     newErrors.email = isValid ? '' : 'Неправильный формат email';
  //     setErrors(newErrors);
  //   }

  //   if (fieldName === 'password') {
  //     const isValidLength = value.length >= 3 && value.length <= 25;
  //     const newErrors = { ...errors };

  //     if (!isValidLength) {
  //       newErrors.password = 'Пароль должен быть от 3 до 25 символов';
  //     } else {
  //       newErrors.password = '';
  //     }
  //     setErrors(newErrors);
  //   }
  // };

  const handleInputChange = (fieldName, value) => {
    const newValues = { ...values };
    newValues[fieldName] = value;
    setValues(newValues);
    validateField(fieldName, value);
    // validateField(fieldName, value);
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
