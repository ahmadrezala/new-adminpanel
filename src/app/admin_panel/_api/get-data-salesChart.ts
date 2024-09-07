import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { DataList } from "../_types/dashboard.interface";
import { AxiosHeaders } from "axios";
import { useSession } from "next-auth/react";



const getSalesChart = (token?: string): Promise<DataList> => {
    let url = `admin/dashboard`;

    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return readData(url,headers)
}

export const useSalesChart = () => {
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
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
        queryKey: ['salesChart'], 
        queryFn: () => {
            if (token) {
                return getSalesChart( token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token,
    });

    return { data, isFetching, error, refetch };
}
