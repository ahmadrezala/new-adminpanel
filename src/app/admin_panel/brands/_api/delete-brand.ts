import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

type DeleteBrandOptions = {
    id: number | string;
};

type Brand = {
    id: number | string;
};

type QueryData = {
    data: {
        brands: Brand[];

    };
};

const deleteBrand = ({ id }: DeleteBrandOptions): Promise<void> => {
    return deleteData(`/brands/${id}`);
};

export const useDeleteBrand = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: deleteBrand,
        onSuccess: async (_, variables) => {
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'brands'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const brands: Brand[] = newData.data.brands || [];

                    const updatedBrands = brands.filter(brand => brand.id !== variables.id);

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            brands: updatedBrands
                        }
                    });
                }
            });
        },
    });

    return { mutate, isLoading };
};
