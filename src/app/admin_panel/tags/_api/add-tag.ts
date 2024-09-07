import { createData } from "@/core/http-service/http-service";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { AddTag } from "../_types/tag.interface";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";




const addTag = (model: AddTag, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return createData<AddTag, void>("admin/tags", model);
}


type AddTagOptions = {
    onSuccess?: () => void
}


export const useAddTag = ({ onSuccess }: AddTagOptions) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);
    const { mutate, isLoading } = useMutation({
        mutationFn: (model: AddTag) => {
            if (token) {
                return addTag(model, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
            if (onSuccess) onSuccess();
        }

    })

    return { mutate, isLoading }
}