import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { ProductList } from "../_types/product.interface";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export type getProductsOptions = {
    page?: number;
    search?: string;
    count?: number;
    token?: string
}

const getProducts = ({ page, search, count, token }: getProductsOptions): Promise<ProductList> => {



    let url = `admin/products?page=${page}`;

    if (count) {
        url = `admin/products?count=${count}&page=${page}`;
    }

    if (search && count) {

        url = `admin/products?count=${count}&search=${encodeURIComponent(search)}`;
    }

    if (search) {
        url = `admin/products?search=${encodeURIComponent(search)}`;
    }
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);
}

export const useProducts = ({ page, search, count }: getProductsOptions) => {
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
        queryKey: ['products', page, search],
        queryFn: () => {
            if (token) {
                return getProducts({ page, search, count, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
