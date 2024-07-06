import { createData } from "@/core/http-service/http-service";
import { AddBrand } from "../_types/brand.interface";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";




const addBrand = (model: AddBrand): Promise<void> => createData<AddBrand, void>("/brands", model);

type AddBrandOptions = {
    onSuccess?: () => void
}


export const useAddBrand = ({ onSuccess }: AddBrandOptions) => {
    const { mutate, isLoading } = useMutation({
        mutationFn: addBrand,
        onSuccess: () => {
            queryClient.invalidateQueries(['brands']);
            if (onSuccess) onSuccess();
        }

    })

    return { mutate, isLoading }
}