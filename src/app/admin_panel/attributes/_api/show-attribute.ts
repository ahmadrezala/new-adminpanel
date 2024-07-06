import { readData } from "@/core/http-service/http-service";

import { useQuery } from "react-query";
import { ShowAttribute } from "../_types/attribute.interface";

export type getAttributesOptions = {
    id: number
}

const getAttributes = ({ id }: getAttributesOptions): Promise<ShowAttribute> => {

    const url = `/attributes/${id}`;
    return readData(url);

}

export const useAttribute = ({ id }: getAttributesOptions) => {

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
        queryKey: ['attributes', id],
        queryFn: () => getAttributes({ id })

    })

    return { data, isFetching, error, refetch };
}