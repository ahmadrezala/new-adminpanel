import { DeepMap, FieldError, FieldValues, Path, UseFormRegister, RegisterOptions } from "react-hook-form";
import { TextboxProps } from "../../textbox/textbox.type";




export type TextInputProps<TFormValues extends FieldValues> = Omit<TextboxProps, 'name'> & {
    register: UseFormRegister<TFormValues>,
    name: Path<TFormValues> | any,
    rules?: RegisterOptions,
    errors: Partial<DeepMap<TFormValues, FieldError>> | any 
            
}
