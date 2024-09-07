import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { AttributesCategory } from "../_types/product.interface";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

export type getCategoriesOptions = {
    id: number | null;
}

const getAttributesCategory = ({ id, token }: getCategoriesOptions & { token: string }): Promise<AttributesCategory> => {
    if (id) {
        const url = `admin/attributes-category/${id}`;
        const headers = new AxiosHeaders();
        headers.set('Authorization', `Bearer ${token}`);
        return readData(url, headers);
    } else {
        return Promise.reject() as Promise<AttributesCategory>;
    }
}

export const useAttributesCategory = ({ id }: getCategoriesOptions) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const {
        data,
        error,
        isFetching,
        refetch
    } = useQuery({
        cacheTime: 7 * 24 * 60 * 60 * 1000,
        staleTime: 24 * 60 * 60 * 1000,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryKey: ['items-create-products', id],
        queryFn: () => {
            if (token) {
                return getAttributesCategory({ id, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
