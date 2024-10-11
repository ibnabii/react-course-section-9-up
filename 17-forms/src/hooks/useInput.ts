import { ChangeEvent, useState } from "react";

export default function useInput(validationFn: (value: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [didEdit, setDidEdit] = useState<boolean>(false);

  const valueIsValid = validationFn(enteredValue);
  console.log({ enteredValue, valueIsValid });
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
