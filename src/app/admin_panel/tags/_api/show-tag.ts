import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { ShowTag } from "../_types/tag.interface";

export type getTagsOptions = {
    id: number
}

const getTags = ({ id }: getTagsOptions): Promise<ShowTag> => {

    const url = `/tags/${id}`;
    return readData(url);

}

export const useTag = ({ id }: getTagsOptions) => {

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
        queryFn: () => getTags({ id })

    })

    return { data, isFetching, error, refetch };
}