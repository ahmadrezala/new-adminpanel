import { updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddTag } from "../_types/tag.interface";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { AxiosHeaders } from "axios";


type UpdateTagOptions = {
    id: number | string;
    data: AddTag
    token?: string


};

type Tag = {
    id: number | string;
    name: string;
};

type QueryData = {
    data: {
        tags: Tag[];
    };
};

const updateTag = ({ id, data, token }: UpdateTagOptions): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return updateData(`admin/tags/${id}`, data, headers);

  
};

export const useUpdateTag = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id, data }: Omit<UpdateTagOptions, 'token'>) => {
            if (token) {
                return updateTag({ id, data, token });
            }
            return Promise.reject(new Error("Token not available"));
        },
        onSuccess: async (_, variables) => {


            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'tags'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const tags: Tag[] = newData.data.tags || [];

                    const updatedTags = tags.map(tag =>
                        tag.id === variables.id ? { ...tag, name: variables.data.name } : tag
                    );

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            tags: updatedTags
                        }
                    });
                }
            });
            queryClient.invalidateQueries(['tags', variables.id]);
        },
    });

    return { mutate, isLoading };
};
