import { readData } from "@/core/http-service/http-service";
import { useQuery } from "react-query";
import { AttributeList } from "../_types/attribute.interface";

export type getAttributesOptions = {
    page: number;
    search?: string;
}

const getAttributes = ({ page, search }: getAttributesOptions): Promise<AttributeList> => {
    let url = `/attributes?page=${page}`;
    if (search) {
        url = `/attributes?search=${encodeURIComponent(search)}`;
    }
    return readData(url);
}

export const useAttributes = ({ page, search }: getAttributesOptions) => {
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
        queryFn: () => getAttributes({ page, search }),
    });

    return { data, isFetching, error, refetch };
}
