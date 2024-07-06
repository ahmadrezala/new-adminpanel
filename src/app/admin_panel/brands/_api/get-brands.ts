import { readData } from "@/core/http-service/http-service";
import { BrandList } from "../_types/brand.interface";
import { useQuery } from "react-query";

export type getBrandsOptions = {
    page: number;
    search?: string;
}

const getBrands = ({ page, search }: getBrandsOptions): Promise<BrandList> => {
    let url = `/brands?page=${page}`;
    if (search) {
        url = `/brands?search=${encodeURIComponent(search)}`;
    }
    return readData(url);
}

export const useBrands = ({ page, search }: getBrandsOptions) => {
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
        queryKey: ['brands', page, search], 
        queryFn: () => getBrands({ page, search }),
    });

    return { data, isFetching, error, refetch };
}
