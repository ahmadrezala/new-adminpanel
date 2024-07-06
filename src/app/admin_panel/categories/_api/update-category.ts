import { updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddCategory } from "../_types/category.interface";


type UpdateCategoryOptions = {
    id: number | string;
    data: AddCategory


};

type Category = {
    id: number | string;
    name: string;
};

type QueryData = {
    data: {
        Categorys: Category[];
    };
};

const updateCategory = ({ id, data }: UpdateCategoryOptions): Promise<void> => {

    return updateData(`/Categorys/${id}`, data);
};

export const useUpdateCategory = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: updateCategory,
        onSuccess: async (_, variables) => {


            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'categorys'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const categories: Category[] = newData.data.Categorys || [];

                    const updatedCategorys = categories.map(category =>
                        category.id === variables.id ? { ...category, name: variables.data.name, slug: variables.data.slug, is_active: variables.data.is_active } : category
                    );

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            Categorys: updatedCategorys
                        }
                    });
                }
            });
            queryClient.invalidateQueries(['Categorys', variables.id]);
        },
    });

    return { mutate, isLoading };
};
