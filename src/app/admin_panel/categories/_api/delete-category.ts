import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

type DeleteCategoryOptions = {
    id: number | string;
};

type Category = {
    id: number | string;
};

type QueryData = {
    data: {
        categories: Category[];

    };
};

const deleteCategory = ({ id }: DeleteCategoryOptions): Promise<void> => {
    return deleteData(`/categories/${id}`);
};

export const useDeleteCategory = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: async (_, variables) => {
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'categories'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const Categories: Category[] = newData.data.categories || [];

                    const updatedCategories = Categories.filter(Category => Category.id !== variables.id);

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            categories: updatedCategories
                        }
                    });
                }
            });
        },
    });

    return { mutate, isLoading };
};
