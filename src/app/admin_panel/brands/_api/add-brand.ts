import { createData } from "@/core/http-service/http-service";
import { AddBrand } from "../_types/brand.interface";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

const addBrand = (model: AddBrand, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return createData<AddBrand, void>("/admin/brands", model, headers);
};

type AddBrandOptions = {
    onSuccess?: () => void;
};

export const useAddBrand = ({ onSuccess }: AddBrandOptions) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: (model: AddBrand) => {
            if (token) {
                return addBrand(model, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['brands']);
            if (onSuccess) onSuccess();
        },
    });

    return { mutate, isLoading };
};
