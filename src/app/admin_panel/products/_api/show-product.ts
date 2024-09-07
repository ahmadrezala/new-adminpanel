import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { ShowProduct } from "../_types/product.interface";
import { useEffect, useState } from "react";

export type getProductsOptions = {
    id: number;
}


const getProduct = (id: number, token: string): Promise<ShowProduct> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    const url = `admin/products/${id}/edit`;
    return readData(url, headers);
}

export const useShowProduct = ({ id }: getProductsOptions) => {
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
        refetch,
    } = useQuery({
        cacheTime: 7 * 24 * 60 * 60 * 1000,
        staleTime: 24 * 60 * 60 * 1000,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryKey: ['products', id],
        queryFn: () => {
            if (token) {
                return getProduct(id, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token, 
    });

    return { data, isFetching, error, refetch };
}
