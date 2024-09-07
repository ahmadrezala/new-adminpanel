import { createData } from "@/core/http-service/http-service";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

const addCategory = (model: FormData, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Authorization', `Bearer ${token}`);

    return createData<FormData, void>("/admin/categories", model, headers);
};

type AddCategoryOptions = {
    onSuccess?: () => void;
};

export const useAddCategory = ({ onSuccess }: AddCategoryOptions) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);
    const { mutate, isLoading } = useMutation({
        mutationFn: (model: FormData) => {
            if (token) {
                return addCategory(model, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            queryClient.invalidateQueries(['items-create-categories']);
            if (onSuccess) onSuccess();
        },
    });

    return { mutate, isLoading };
};
