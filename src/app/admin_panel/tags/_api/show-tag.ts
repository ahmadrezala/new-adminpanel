import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { ShowTag } from "../_types/tag.interface";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export type getTagsOptions = {
    id: number
    token?: string
}

const getTags = ({ id , token }: getTagsOptions): Promise<ShowTag> => {


    const url = `admin/tags/${id}`;
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url, headers);

}

export const useTag = ({ id }: getTagsOptions) => {
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
        queryKey: ['tags', id],
        queryFn: () => {
            if (token) {
                return getTags({ id, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,

    })

    return { data, isFetching, error, refetch };
}