import { createData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { AddProduct } from "../_types/product.interface";
import { useEffect, useState } from "react";

// تعریف نوع داده‌ها
type UpdateProductOptions = {
    id: number | string;
    formData: FormData;
};

type Product = {
    id: number | string;
    name: string;
};

type QueryData = {
    data: {
        products: Product[];
    };
};


const updateProductCategory = ({ id, formData }: UpdateProductOptions, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Authorization', `Bearer ${token}`);

    return createData<FormData, void>(`admin/products/${id}/category-update?_method=PUT`, formData, headers);
};


export const useUpdateProductCategory = (categoryName: string) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: (options: UpdateProductOptions) => {
            if (token) {
                return updateProductCategory(options, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, variables) => {
            var object: any = {};
            variables.formData.forEach(function (value, key) {
                object[key] = value;
            });

            console.log(object);

            // به‌روزرسانی داده‌های کش
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'products'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const products: Product[] = newData.data.products || [];

                    const updatedProducts = products.map(product => {
                        if (product.id === variables.id) {
                            const updatedProduct: any = {
                                ...product,
                            };

                            if (categoryName) {
                                updatedProduct.category = categoryName;
                            }

                            return updatedProduct;
                        }

                        return product;
                    });

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            products: updatedProducts
                        }
                    });
                }
            });

            queryClient.invalidateQueries(['products', variables.id]);
        },
    });

    return { mutate, isLoading };
};
