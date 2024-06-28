import { DeepMap, FieldError, FieldValues, Path, UseFormRegister, RegisterOptions } from "react-hook-form";
import { TextareaProps } from "../../textarea/textarea.type";




export type TextareaInputProps<TFormValues extends FieldValues> = Omit<TextareaProps, 'name'> & {
    register: UseFormRegister<TFormValues>,
    name: Path<TFormValues>,
    rules?: RegisterOptions,
    errors: Partial<DeepMap<TFormValues, FieldError>>
}
