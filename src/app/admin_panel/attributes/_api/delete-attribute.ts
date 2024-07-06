import { deleteData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
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

const deleteAttribute = ({ id }: DeleteAttributeOptions): Promise<void> => {
    return deleteData(`/attributes/${id}`);
};

export const useDeleteAttribute = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: deleteAttribute,
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
