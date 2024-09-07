import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { CategoryList } from "../_types/category.interface";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type getCategoriesOptions = {
    page?: number;
    search?: string;
    count?: number;
    token?: string
}

const getCategories = ({ page, search, count, token }: getCategoriesOptions): Promise<CategoryList> => {



    let url = `admin/categories?page=${page}`;

    if (count) {
        url = `admin/categories?count=${count}&page=${page}`;
    }

    if (search && count) {

        url = `admin/categories?count=${count}&search=${encodeURIComponent(search)}`;
    }

    if (search) {
        url = `admin/categories?search=${encodeURIComponent(search)}`;
    }
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url,headers);
}

export const useCategories = ({ page, search, count }: getCategoriesOptions) => {
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
        queryKey: ['categories', page, search],
        queryFn: () => {
            if (token) {
                return getCategories({ page, search, count, token  });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
