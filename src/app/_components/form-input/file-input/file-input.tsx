import { FieldValues, get } from "react-hook-form";
import { FileInputProps } from "./file-input.types";
import Filebox from "../../filebox/filebox";

const FileInput = <TFormValues extends FieldValues>({
  name,
  register,
  errors,
  rules,
  label,
  variant,
  ...rest
}: FileInputProps<TFormValues>) => {
  const error = get(errors, name);
  const hasError = !!error;

  return (
    <div className="flex flex-wrap">
      <Filebox
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

export default FileInput;
