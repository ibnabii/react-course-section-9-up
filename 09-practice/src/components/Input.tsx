import { type ComponentPropsWithoutRef, forwardRef, Ref } from "react";

// TODO;
// // Separate types for input and textarea props
// type InputElementProps = ComponentPropsWithoutRef<"input"> & {
//   isTextArea?: false;
// };
//
// type TextAreaElementProps = ComponentPropsWithoutRef<"textarea"> & {
//   isTextArea: true;
// };
//
// // Unified type that represents either input or textarea
// type InputProps = {
//   label: string;
// } & (InputElementProps | TextAreaElementProps);
//
// const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
//   ({ label, isTextArea = false, ...props }, ref) => {
//     return (

type InputProps<T extends boolean> = {
  label: string;
  isTextArea?: T;
} & (T extends false
  ? ComponentPropsWithoutRef<"input">
  : ComponentPropsWithoutRef<"textarea">);

const Input = forwardRef(
  <T extends boolean = false>(
    { label, isTextArea = false as T, ...props }: InputProps<T>,
    ref: T extends false ? Ref<HTMLInputElement> : Ref<HTMLTextAreaElement>,
  ) => {
    const classes =
      "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          {label}
        </label>
        {isTextArea && (
          <textarea
            className={classes}
            {...(props as ComponentPropsWithoutRef<"textarea">)}
            ref={ref as Ref<HTMLTextAreaElement>}
          />
        )}
        {!isTextArea && (
          <input
            className={classes}
            {...(props as ComponentPropsWithoutRef<"input">)}
            ref={ref as Ref<HTMLInputElement>}
          />
        )}
      </p>
    );
  },
);

export default Input;
