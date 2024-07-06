import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import type { itemsCreateCategory } from "../_types/category.interface";

export type getCategoriesOptions = {
    page?: number;
    search?: string;
    itemcount?: number;
}

const itemsCreateCategory = (): Promise<itemsCreateCategory> => {

    let url = `/categories/create`;

    return readData(url);
}

export const useItemCreateCategory = () => {
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
        queryKey: ['items-create-categories'],
        queryFn: () => itemsCreateCategory(),
    });

    return { data, isFetching, error, refetch };
}
