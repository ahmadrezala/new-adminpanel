import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { TagList } from "../_types/tag.interface";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

export type getTagsOptions = {
    page: number;
    search?: string;
    token?: string;
}

const getTags = ({ page, search, token }: getTagsOptions): Promise<TagList> => {
    let url = `admin/tags?page=${page}`;
    if (search) {
        url = `admin/tags?search=${encodeURIComponent(search)}`;
    }
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url,headers)
}

export const useTags = ({ page, search }: getTagsOptions) => {
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
        queryKey: ['tags', page, search], 
        queryFn: () => {
            if (token) {
                return getTags({ page, search, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
