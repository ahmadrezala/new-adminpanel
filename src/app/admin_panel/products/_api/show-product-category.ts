import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { ShowProductCategory } from "../_types/product.interface";
import { useEffect, useState } from "react";


const getProductCategory = (id: number, token: string): Promise<ShowProductCategory> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    const url = `admin/products/${id}/category`;
    return readData(url, headers);
}

export const useShowProductCategory = ({ id }: { id: number }) => {
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
        queryKey: ['productscategory', id],
        queryFn: () => {
            if (token) {
                return getProductCategory(id, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token, 
    });

    return { data, isFetching, error, refetch };
}
