import { DeepMap, FieldError, FieldValues, Path, UseFormRegister, RegisterOptions } from "react-hook-form";
import { DateboxProps } from "../../datebox/datebox.type";




export type DateInputProps<TFormValues extends FieldValues> = Omit<DateboxProps, 'name'> & {
    register: UseFormRegister<TFormValues>,
    name: Path<TFormValues> | any,
    rules?: RegisterOptions,
    errors: Partial<DeepMap<TFormValues, FieldError>> | any 
            
}
