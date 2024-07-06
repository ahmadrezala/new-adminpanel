import { createData } from "@/core/http-service/http-service";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { AddCategory } from "../_types/category.interface";
import { AxiosHeaders } from "axios";

const headers = new AxiosHeaders();
headers.set('Content-Type', 'multipart/form-data');

const addCategory = (model: FormData): Promise<void> => createData<FormData, void>("/categories", model, headers);

type AddCategoryOptions = {
    onSuccess?: () => void
}


export const useAddCategory = ({ onSuccess }: AddCategoryOptions) => {
    const { mutate, isLoading } = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            queryClient.invalidateQueries(['items-create-categories']);
            if (onSuccess) onSuccess();
        }

    })

    return { mutate, isLoading }
}