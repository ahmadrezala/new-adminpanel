import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { ShowCategory } from "../_types/category.interface";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

export type getCategoriesOptions = {
    id: number
    token?: string
}

const getCategories = ({ id, token }: getCategoriesOptions): Promise<ShowCategory> => {

    const url = `admin/categories/${id}`;
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);

}

export const useCategory = ({ id }: getCategoriesOptions) => {
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
        queryKey: ['categories', id],
        queryFn: () => {
            if (token) {
                return getCategories({ id, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,

    })

    return { data, isFetching, error, refetch };
}