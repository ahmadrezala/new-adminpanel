import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { TagList } from "../_types/tag.interface";

export type getTagsOptions = {
    page: number;
    search?: string;
}

const getTags = ({ page, search }: getTagsOptions): Promise<TagList> => {
    let url = `/tags?page=${page}`;
    if (search) {
        url = `/tags?search=${encodeURIComponent(search)}`;
    }
    return readData(url);
}

export const useTags = ({ page, search }: getTagsOptions) => {
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
        queryFn: () => getTags({ page, search }),
    });

    return { data, isFetching, error, refetch };
}
