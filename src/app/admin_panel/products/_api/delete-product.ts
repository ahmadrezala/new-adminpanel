import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

type DeleteProductOptions = {
    id: number | string;
};

type Product = {
    id: number | string;
};

type QueryData = {
    data: {
        products: Product[];
    };
};

const deleteProduct = ({ id }: DeleteProductOptions, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    
    return deleteData(`admin/products/${id}`, headers);
};

export const useDeleteProduct = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: (options: DeleteProductOptions) => {
            if (token) {
                return deleteProduct(options, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, variables) => {
            // به‌روزرسانی کش
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'products'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const products: Product[] = newData.data.products || [];

                    // حذف محصول از لیست محصولات
                    const updatedProducts = products.filter(product => product.id !== variables.id);

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            products: updatedProducts
                        }
                    });
                }
            });
        },
    });

    return { mutate, isLoading };
};
