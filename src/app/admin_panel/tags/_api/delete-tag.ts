import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { AxiosHeaders } from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

type DeleteTagOptions = {
    id: number | string;
};

type Tag = {
    id: number | string;
};

type QueryData = {
    data: {
        tags: Tag[];

    };
};

const deleteTag = ({ id }: DeleteTagOptions, token: string): Promise<void> => {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return deleteData(`admin/tags/${id}`);
};

export const useDeleteTag = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id }: DeleteTagOptions) => {
            if (token) {
                return deleteTag({ id }, token);
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
                    const Tags: Tag[] = newData.data.tags || [];

                    const updatedTags = Tags.filter(Tag => Tag.id !== variables.id);

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            tags: updatedTags
                        }
                    });
                }
            });
        },
    });

    return { mutate, isLoading };
};
