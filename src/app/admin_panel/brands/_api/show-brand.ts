import { readData } from "@/core/http-service/http-service";
import { ShowBrand } from "../_types/brand.interface"
import { useQuery } from "react-query";

export type getBrandsOptions = {
    id: number
}

const getBrands = ({ id }: getBrandsOptions): Promise<ShowBrand> => {

    const url = `/brands/${id}`;
    return readData(url);

}

export const useBrand = ({id}: getBrandsOptions) => {
    
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
        queryKey: ['brands', id],
        queryFn: () => getBrands({ id })
        
    })

    return { data, isFetching };
}