import { readData } from "@/core/http-service/http-service";
import { BrandList } from "../_types/brand.interface"
import { useQuery } from "react-query";

export type getBrandsOptions = {
    page: number
}

const getBrands = ({ page }: getBrandsOptions): Promise<BrandList> => {

    const url = `/brands?page=${page}`;
    return readData(url);

}

export const useBrands = ({ page }: getBrandsOptions) => {

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
        queryKey: ['brands', page],
        queryFn: () => getBrands({ page })

    })

    return { data, isFetching };
}