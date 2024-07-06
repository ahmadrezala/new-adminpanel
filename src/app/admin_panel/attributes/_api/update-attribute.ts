import { updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddAttribute } from "../_types/attribute.interface";


type UpdateAttributeOptions = {
    id: number | string;
    data: AddAttribute


};

type Attribute = {
    id: number | string;
    name: string;
};

type QueryData = {
    data: {
        attributes: Attribute[];
    };
};

const updateAttribute = ({ id, data }: UpdateAttributeOptions): Promise<void> => {

    return updateData(`/attributes/${id}`, data);
};

export const useUpdateAttribute = () => {
    const { mutate, isLoading } = useMutation({
        mutationFn: updateAttribute,
        onSuccess: async (_, variables) => {


            const cachedQueries = queryClient.getQueryCache().findAll({
                predicate: (query: any) => (query.queryKey as unknown[])[0] === 'attributes'
            });

            cachedQueries.forEach(query => {
                const newData: Partial<QueryData> = query.state.data ? { ...query.state.data } : {};

                if (newData.data) {
                    const attributes: Attribute[] = newData.data.attributes || [];

                    const updatedAttributes = attributes.map(attribute =>
                        attribute.id === variables.id ? { ...attribute, name: variables.data.name } : attribute
                    );

                    queryClient.setQueryData<QueryData>(query.queryKey, {
                        ...newData,
                        data: {
                            ...newData.data,
                            attributes: updatedAttributes
                        }
                    });
                }
            });
            queryClient.invalidateQueries(['attributes', variables.id]);
        },
    });

    return { mutate, isLoading };
};
