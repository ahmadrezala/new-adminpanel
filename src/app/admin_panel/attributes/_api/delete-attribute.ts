import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

type DeleteAttributeOptions = {
    id: number | string;
};

type Attribute = {
    id: number | string;
};

type QueryData = {
    data: {
        attributes: Attribute[];

    };
};

const deleteAttribute = ({ id }: DeleteAttributeOptions, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);

    return deleteData(`/admin/attributes/${id}`, headers);
};

export const useDeleteAttribute = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id }: DeleteAttributeOptions) => {
            if (token) {
                return deleteAttribute({ id }, token);
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, variables) => {
            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'attributes'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const Attributes: Attribute[] = newData.data.attributes || [];

                    const updatedAttributes = Attributes.filter(Attribute => Attribute.id !== variables.id);

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            attributes: updatedAttributes
                        }
                    });
                }
            });
        },
    });

    return { mutate, isLoading };
};
