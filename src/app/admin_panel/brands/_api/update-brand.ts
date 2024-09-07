import { updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddBrand } from "../_types/brand.interface";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type UpdateBrandOptions = {
    id: number | string;
    data: AddBrand;
    token?: string;
};

type Brand = {
    id: number | string;
    name: string;
    slug: string;
    is_active: boolean;
};

type QueryData = {
    data: {
        brands: Brand[];
    };
};

const updateBrand = ({ id, data, token }: UpdateBrandOptions): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return updateData(`admin/brands/${id}`, data, headers);
};

export const useUpdateBrand = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id, data }: Omit<UpdateBrandOptions, 'token'>) => {
            if (token) {
                return updateBrand({ id, data, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, variables) => {
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'brands'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const brands: Brand[] = newData.data.brands || [];

                    const updatedBrands = brands.map(brand =>
                        brand.id === variables.id ? {
                            ...brand,
                            name: variables.data.name,
                            slug: variables.data.slug,
                            is_active: Boolean(Number(variables.data.is_active))
                        } : brand
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
