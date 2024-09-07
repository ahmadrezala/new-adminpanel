import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

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

const deleteCategory = async ({ id }: DeleteCategoryOptions, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return deleteData(`admin/categories/${id}`, headers);
};

export const useDeleteCategory = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id }: DeleteCategoryOptions) => {
            if (token) {
                return deleteCategory({ id }, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: (_, variables) => {
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'categories'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const categories: Category[] = newData.data.categories || [];

                    const updatedCategories = categories.filter(category => category.id !== variables.id);

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
