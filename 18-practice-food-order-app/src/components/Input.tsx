import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  error?: string | false;
} & ComponentPropsWithoutRef<"input">;

export default function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
