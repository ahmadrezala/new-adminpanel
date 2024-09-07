import { DeepMap, FieldError, FieldValues, Path, UseFormRegister, RegisterOptions } from "react-hook-form";
import { SelectBoxProps } from "../../selectbox/selectbox.types";




export type SelectBoxInputProps<TFormValues extends FieldValues> = Omit<SelectBoxProps, 'name'> & {
    register: UseFormRegister<TFormValues>,
    name: Path<TFormValues>,
    rules?: RegisterOptions,
    errors: Partial<DeepMap<TFormValues, FieldError>> | any 
}
