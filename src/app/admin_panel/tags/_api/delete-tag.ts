import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
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

const deleteTag = ({ id }: DeleteTagOptions): Promise<void> => {
    return deleteData(`/tags/${id}`);
};

export const useDeleteTag = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: deleteTag,
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
