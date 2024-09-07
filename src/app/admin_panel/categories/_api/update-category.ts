import { createData, updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddCategory } from "../_types/category.interface";
import { AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


type UpdateCategoryOptions = {
    id: number | string;
    formData: FormData


};

type Category = {
    id: number | string;
    name: string;
};

type QueryData = {
    data: {
        categories: Category[];
    };
};

const headers = new AxiosHeaders();
headers.set('Content-Type', 'multipart/form-data');



const updateCategory = ({ id, formData }: UpdateCategoryOptions, token: string): Promise<void> => {

    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Authorization', `Bearer ${token}`);
    return createData<FormData, void>(`admin/categories/${id}?_method=PUT`, formData, headers);
};

export const useUpdateCategory = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id, formData }: Omit<UpdateCategoryOptions, 'token'>) => {
            if (token) {
                return updateCategory({ id, formData }, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, variables) => {



            var object: any = {};
            variables.formData.forEach(function (value, key) {
                object[key] = value;
            });




            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'categories'
            });


            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const categories: Category[] = newData.data.categories || [];



                    const updatedCategories = categories.map(category => {
                        if (category.id === variables.id) {
                            const updatedCategory: any = {
                                ...category,
                                name: object.name,
                                slug: object.slug,
                                is_active: object.is_active === '1',
                                description: object.is_active,
                            };

                            if (object.image) {
                                updatedCategory.image = URL.createObjectURL(object.image);
                            }

                            return updatedCategory;
                        }

                        return category;
                    });


                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            categories: updatedCategories
                        }
                    });
                }
            });
            queryClient.invalidateQueries(['categories', variables.id]);
        },
    });

    return { mutate, isLoading };
};
