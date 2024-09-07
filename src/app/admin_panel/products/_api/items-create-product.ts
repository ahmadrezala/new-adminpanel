import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import type { itemsCreateProduct } from "../_types/product.interface";
import { useEffect, useState } from "react";

// تابع برای دریافت داده‌ها با هدرهای توکن
const itemsCreateProduct = (token: string): Promise<itemsCreateProduct> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    const url = `admin/products/create`;
    return readData(url, headers);
}

export const useItemCreateProduct = () => {
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
        queryKey: ['items-create-products'],
        queryFn: () => {
            if (token) {
                return itemsCreateProduct(token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        enabled: !!token, // تنها در صورتی که توکن موجود است، درخواست ارسال می‌شود
    });

    return { data, isFetching, error, refetch };
}
