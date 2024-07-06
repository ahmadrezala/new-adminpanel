import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { CategoryList } from "../_types/category.interface";

export type getCategoriesOptions = {
    page?: number;
    search?: string;
    count?: number;
}

const getCategories = ({ page, search, count }: getCategoriesOptions): Promise<CategoryList> => {



    let url = `/categories?page=${page}`;

    if (count) {
        url = `/categories?count=${count}&page=${page}`;
    }

    if (search && count) {

        url = `/categories?count=${count}&search=${encodeURIComponent(search)}`;
    }

    if (search) {
        url = `/categories?search=${encodeURIComponent(search)}`;
    }
    return readData(url);
}

export const useCategories = ({ page, search, count }: getCategoriesOptions) => {
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
        queryFn: () => getCategories({ page, search, count }),
    });

    return { data, isFetching, error, refetch };
}
