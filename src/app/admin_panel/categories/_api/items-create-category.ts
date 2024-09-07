import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import type { itemsCreateCategory } from "../_types/category.interface";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

export type getCategoriesOptions = {
    page?: number;
    search?: string;
    itemcount?: number;
}

const itemsCreateCategory = (token?: string): Promise<itemsCreateCategory> => {

    let url = `admin/categories/create`;

    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);
}

export const useItemCreateCategory = () => {
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
        queryKey: ['items-create-categories'],
        queryFn: () => {
            if (token) {
                return itemsCreateCategory(token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
