import { updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddBrand } from "../_types/brand.interface";

type UpdateBrandOptions = {
    id: number | string;
    data: AddBrand


};

type Brand = {
    id: number | string;
    name: string;
};

type QueryData = {
    data: {
        brands: Brand[];
    };
};

const updateBrand = ({ id, data }: UpdateBrandOptions): Promise<void> => {

    return updateData(`/brands/${id}`, data);
};

export const useUpdateBrand = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: updateBrand,
        onSuccess: async (_, variables) => {


            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'brands'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const brands: Brand[] = newData.data.brands || [];

                    const updatedBrands = brands.map(brand =>
                        brand.id === variables.id ? { ...brand, name: variables.data.name, slug: variables.data.slug, is_active: variables.data.is_active } : brand
                    );

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            brands: updatedBrands
                        }
                    });
                }
            });
            queryClient.invalidateQueries(['brands', variables.id]);
        },
    });

    return { mutate, isLoading };
};
