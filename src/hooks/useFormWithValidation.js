import { useState, useCallback } from "react";

import { validate } from "../utils/validators";

export function useFormWithValidation(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(undefined);

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const elements = event.target.form.elements;
    const formValid = !Array.from(elements).some(element => {
      return !validate(element.name, element.value).isOk
    })
    setIsValid(formValid);
    const validationResult = validate(name, value);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationResult.message });
  }

  const resetForm = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setValues(inputValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
