import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";

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

const deleteBrand = ({ id }: DeleteBrandOptions, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return deleteData(`/admin/brands/${id}`, headers);
};

export const useDeleteBrand = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id }: DeleteBrandOptions) => {
            if (token) {
                return deleteBrand({ id }, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, { id }) => {
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'brands'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const brands: Brand[] = newData.data.brands || [];

                    const updatedBrands = brands.filter(brand => brand.id !== id);

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
