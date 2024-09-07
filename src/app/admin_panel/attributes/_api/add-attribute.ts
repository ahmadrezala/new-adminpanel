import { createData } from "@/core/http-service/http-service";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { AddAttribute } from "../_types/attribute.interface";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";


const addAttribute = async (model: AddAttribute, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
    return createData<AddAttribute, void>("admin/attributes", model, headers);
};

type AddAttributeOptions = {
    onSuccess?: () => void;
};

export const useAddAttribute = ({ onSuccess }: AddAttributeOptions) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: (model: AddAttribute) => {
            if (token) {
                return addAttribute(model, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['attributes']);
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            console.error("Error adding attribute:", error);
        },
    });

    return { mutate, isLoading };
};
