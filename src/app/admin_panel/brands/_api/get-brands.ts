
import { readData } from "@/core/http-service/http-service";
import { BrandList } from "../_types/brand.interface";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { auth } from "@/auth";
import { useEffect, useState } from "react";

export type getBrandsOptions = {
    page: number;
    search?: string;
    token?: string;
}

const getBrands = ({ page, search, token }: getBrandsOptions): Promise<BrandList> => {
    let url = `admin/brands?page=${page}`;
    console.log(token);

    if (search) {
        url = `admin/brands?search=${encodeURIComponent(search)}`;
    }

    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);
}

export const useBrands = ({ page, search }: getBrandsOptions) => {
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
        queryKey: ['brands', page, search],
        queryFn: () => {
            if (token) {
                return getBrands({ page, search, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
