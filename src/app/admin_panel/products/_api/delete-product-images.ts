import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

type DeleteProductOptions = {
    id: number | string;
};

type ProductsImages = {
    id: number | string;
    image: string;
};

type QueryData = {
    data: {
        images: ProductsImages[];
    };
};

const deleteProductImages = ({ id }: DeleteProductOptions, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return deleteData(`admin/products/${id}/images`, headers);
};

export const useDeleteProductImages = () => {
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
                return deleteProductImages(options, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, variables) => {

            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'productsImages'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const images: ProductsImages[] = newData.data.images || [];

                    // حذف تصویر از لیست تصاویر
                    const updatedImages = images.filter(image => image.id !== variables.id);

                    console.log(updatedImages);

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            images: updatedImages
                        }
                    });
                }
            });
        },
    });

    return { mutate, isLoading };
};
