import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  error?: string | false;
} & ComponentPropsWithoutRef<"input">;

export default function Input({ label, id, error, ...props }: InputProps) {
  // const [enteredValue, setEnteredValue] = useState<string>("");
  // const [didEdit, setDidEdit] = useState<boolean>(false);

  // function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
  //   setEnteredValue(event.target.value);
  //   setDidEdit(false);
  // }
  //
  // function handleInputBlur() {
  //   setDidEdit(true);
  // }

  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        // onChange={handleInputChange}
        // value={enteredValue}
        // onBlur={handleInputBlur}
      />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
