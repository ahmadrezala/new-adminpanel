import { FieldValues, get } from "react-hook-form";
import { TextInputProps } from "./text-input.types";
import { Textbox } from "../../textbox";

const TextInput = <TFormValues extends FieldValues>({
  name,
  register,
  errors,
  rules,
  label,
  variant,
  defaultValue,
  ...rest
}: TextInputProps<TFormValues>) => {
  const error = get(errors, name);
  const hasError = !!error;

  return (
    <div className="flex flex-wrap">
      <Textbox
        label={label}
        defaultValue={defaultValue}
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

export default TextInput;
