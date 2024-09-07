import { createData } from "@/core/http-service/http-service";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

const addProduct = (model: FormData, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Authorization', `Bearer ${token}`);

    return createData<FormData, void>("admin/products", model, headers);
};

type AddProductOptions = {
    onSuccess?: () => void;
};

export const useAddProduct = ({ onSuccess }: AddProductOptions) => {
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
                return addProduct(model, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            queryClient.invalidateQueries(['items-create-products']);
            if (onSuccess) onSuccess();
        },
    });

    return { mutate, isLoading };
};
