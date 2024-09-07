import { readData } from "@/core/http-service/http-service";

import { useQuery } from "react-query";
import { ShowAttribute } from "../_types/attribute.interface";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type getAttributesOptions = {
    id: number
    token?: string
}

const getAttributes = ({ id, token }: getAttributesOptions): Promise<ShowAttribute> => {

    const url = `admin/attributes/${id}`;
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);

}

export const useAttribute = ({ id }: getAttributesOptions) => {
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
        queryKey: ['attributes', id],
        queryFn: () => {
            if (token) {
                return getAttributes({ id, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,

    })

    return { data, isFetching, error, refetch };
}