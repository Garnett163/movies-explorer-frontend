import { useState } from 'react';

export function useFieldValidation() {
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    if (fieldName === 'name') {
      const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
      const isValidLength = value.length >= 3 && value.length <= 25;
      const isValidFormat = nameRegex.test(value);

      if (!isValidLength) {
        newErrors.name = 'Имя должно быть от 3 до 25 символов';
      } else if (!isValidFormat) {
        newErrors.name = 'Имя должно содержать только латиницу, кириллицу, пробел или дефис';
      } else {
        newErrors.name = '';
      }
    }

    if (fieldName === 'email') {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i;
      const isValid = emailRegex.test(value);
      newErrors.email = isValid ? '' : 'Некорректный адрес электронной почты, примерный шаблон abc@mail.ru';
    }

    if (fieldName === 'password') {
      const isValidLength = value.length >= 3 && value.length <= 25;
      newErrors.password = isValidLength ? '' : 'Пароль должен быть от 3 до 25 символов';
    }

    setErrors(newErrors);
  };

  return { errors, validateField };
}
