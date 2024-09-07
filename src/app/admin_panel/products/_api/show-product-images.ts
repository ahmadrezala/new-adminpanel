import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { ShowProductImages } from "../_types/product.interface";
import { useEffect, useState } from "react";

export type getProductsOptions = {
    id: number;
}


const getProductImages = (id: number, token: string): Promise<ShowProductImages> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    const url = `admin/products/${id}/images`;
    return readData(url, headers);
}

export const useShowProductImages = ({ id }: getProductsOptions) => {
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
        queryKey: ['productsImages', id],
        queryFn: () => {
            if (token) {
                return getProductImages(id, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token, 
    });

    return { data, isFetching, error, refetch };
}
