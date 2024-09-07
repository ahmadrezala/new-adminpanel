import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { AttributeList } from "../_types/attribute.interface";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type getAttributesOptions = {
    page: number;
    search?: string;
    token?: string
}

const getAttributes = ({ page, search, token }: getAttributesOptions): Promise<AttributeList> => {
    let url = `admin/attributes?page=${page}`;
    if (search) {
        url = `admin/attributes?search=${encodeURIComponent(search)}`;
    }
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);
}

export const useAttributes = ({ page, search }: getAttributesOptions) => {
    // const { data: session } = useSession();
    // const token = session?.user?.accessToken;

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
        queryKey: ['attributes', page, search],
        queryFn: () => {
            if (token) {
                return getAttributes({ page, search, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
