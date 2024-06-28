import { FieldValues, get } from "react-hook-form";
import { TextareaInputProps } from "./textarea-input.types";
import { Textarea } from "../../textarea";

const TextareaInput = <TFormValues extends FieldValues>({
  name,
  register,
  errors,
  rules,
  label,
  variant,
  ...rest
}: TextareaInputProps<TFormValues>) => {
  const error = get(errors, name);
  const hasError = !!error;

  return (
    <div className="flex flex-wrap">
      <Textarea
        label={label}
        {...register(name, rules)}
        {...(hasError ? { variant: "error" } : { variant: variant })}
        {...rest}
      />

      {hasError && (
        <div className="mt-2 text-sm text-[24px] text-error">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default TextareaInput;
