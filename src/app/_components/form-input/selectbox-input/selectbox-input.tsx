import { FieldValues, get } from "react-hook-form";
import { SelectBoxInputProps } from "./selectbox-input.types";
import SelectBox from "../../selectbox/selectbox";

const SelectBoxInput = <TFormValues extends FieldValues>({
  name,
  register,
  errors,
  rules,
  options,
  label,
  variant,
  defaultValue,
  ...rest
}: SelectBoxInputProps<TFormValues>) => {
  const error = get(errors, name);
  const hasError = !!error;

  return (
    <div className="flex flex-wrap">
      <SelectBox
        options={options}
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

export default SelectBoxInput;
