import { createData } from "@/core/http-service/http-service";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { AddTag } from "../_types/tag.interface";




const addTag = (model: AddTag): Promise<void> => createData<AddTag, void>("/tags", model);

type AddTagOptions = {
    onSuccess?: () => void
}


export const useAddTag = ({ onSuccess }: AddTagOptions) => {
    const { mutate, isLoading } = useMutation({
        mutationFn: addTag,
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
            if (onSuccess) onSuccess();
        }

    })

    return { mutate, isLoading }
}