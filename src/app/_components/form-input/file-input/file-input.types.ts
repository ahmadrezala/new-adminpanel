import { DeepMap, FieldError, FieldValues, Path, UseFormRegister, RegisterOptions } from "react-hook-form";
import { FileboxProps } from "../../filebox/filebox.types";




export type FileInputProps<TFormValues extends FieldValues> = Omit<FileboxProps, 'name'> & {
    register: UseFormRegister<TFormValues>,
    name: Path<TFormValues>,
    rules?: RegisterOptions,
    errors: Partial<DeepMap<TFormValues, FieldError>>
}
