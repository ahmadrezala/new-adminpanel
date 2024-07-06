import { updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddTag } from "../_types/tag.interface";


type UpdateTagOptions = {
    id: number | string;
    data: AddTag


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

const updateTag = ({ id, data }: UpdateTagOptions): Promise<void> => {

    return updateData(`/tags/${id}`, data);
};

export const useUpdateTag = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: updateTag,
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
