import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { ShowCategory } from "../_types/category.interface";

export type getCategoriesOptions = {
    id: number
}

const getCategories = ({ id }: getCategoriesOptions): Promise<ShowCategory> => {

    const url = `/Categorys/${id}`;
    return readData(url);

}

export const useCategory = ({ id }: getCategoriesOptions) => {

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
        queryKey: ['Categorys', id],
        queryFn: () => getCategories({ id })

    })

    return { data, isFetching, error, refetch };
}