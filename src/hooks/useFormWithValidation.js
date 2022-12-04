import { useState, useCallback } from "react";

import { validate } from "../utils/validators";

export function useFormWithValidation(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const errorMessage = validate(name, value);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsValid(
      !Object.values(errors).some((element) => element !== "") &&
        !Array.from(values).some((element) => element === "")
    );
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
