import { createData } from "@/core/http-service/http-service";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { AddAttribute } from "../_types/attribute.interface";




const addAttribute = (model: AddAttribute): Promise<void> => createData<AddAttribute, void>("/attributes", model);

type AddAttributeOptions = {
    onSuccess?: () => void
}


export const useAddAttribute = ({ onSuccess }: AddAttributeOptions) => {
    const { mutate, isLoading } = useMutation({
        mutationFn: addAttribute,
        onSuccess: () => {
            queryClient.invalidateQueries(['attributes']);
            if (onSuccess) onSuccess();
        }

    })

    return { mutate, isLoading }
}