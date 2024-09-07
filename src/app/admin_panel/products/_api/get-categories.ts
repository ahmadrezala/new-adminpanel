import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { AttributesCategory } from "../_types/product.interface";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export type getCategoriesOptions = {
    id: number | null
}

const getCategories = (token: string): Promise<AttributesCategory> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return readData('admin/products-categories', headers);
}

export const useCategories = () => {
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
        queryKey: ['productCategories'],
        queryFn: () => {
            if (token) {
                return getCategories(token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}

