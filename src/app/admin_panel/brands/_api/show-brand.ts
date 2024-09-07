import { readData } from "@/core/http-service/http-service";
import { ShowBrand } from "../_types/brand.interface"
import { useQuery } from "react-query";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type getBrandsOptions = {
    id: number
    token?: string
}

const getBrands = ({ id, token }: getBrandsOptions): Promise<ShowBrand> => {

    const url = `admin/brands/${id}`;
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);

}

export const useBrand = ({ id }: getBrandsOptions) => {
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
        queryKey: ['brands', id],
        queryFn: () => {
            if (token) {
                return getBrands({ id, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,

    })

    return { data, isFetching, error, refetch };
}