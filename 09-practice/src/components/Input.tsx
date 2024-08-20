import { type ComponentPropsWithoutRef, forwardRef, Ref } from "react";

// Separate types for input and textarea props
type InputElementProps = ComponentPropsWithoutRef<"input"> & {
  isTextArea?: false;
};

type TextAreaElementProps = ComponentPropsWithoutRef<"textarea"> & {
  isTextArea: true;
};

// Unified type that represents either input or textarea
type InputProps = {
  label: string;
} & (InputElementProps | TextAreaElementProps);

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, isTextArea = false, ...props }, ref) => {
    const classes =
      "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

    function returnComponent(isTextArea: boolean) {
      if (isTextArea) {
        return (
          <textarea
            className={classes}
            {...(props as ComponentPropsWithoutRef<"textarea">)}
            ref={ref as Ref<HTMLTextAreaElement>}
          />
        );
      } else {
        return (
          <input
            className={classes}
            {...(props as ComponentPropsWithoutRef<"input">)}
            ref={ref as Ref<HTMLInputElement>}
          />
        );
      }
    }

    return (
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          {label}
        </label>
        {returnComponent(isTextArea)}
      </p>
    );
  },
);

export default Input;
