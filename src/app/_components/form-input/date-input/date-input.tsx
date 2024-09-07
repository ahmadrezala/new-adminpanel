import { FieldValues, get } from "react-hook-form";
import Datebox from "../../datebox/datebox";
import { DateInputProps } from "./date-input.types";


const DateInput = <TFormValues extends FieldValues>({
  name,
  register,
  errors,
  rules,
  label,
  variant,
  defaultValue,
  ...rest
}: DateInputProps<TFormValues>) => {
  const error = get(errors, name);
  const hasError = !!error;

  return (
    <div className="flex flex-wrap">
      <Datebox
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

export default DateInput;
