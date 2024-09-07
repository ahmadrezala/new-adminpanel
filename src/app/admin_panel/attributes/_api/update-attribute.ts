import { updateData } from "@/core/http-service/http-service";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";
import { AddAttribute } from "../_types/attribute.interface";
import { AxiosHeaders } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


type UpdateAttributeOptions = {
    id: number | string;
    data: AddAttribute
    token?: string


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

const updateAttribute = ({ id, data, token }: UpdateAttributeOptions): Promise<void> => {

    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    return updateData(`admin/attributes/${id}`, data, headers);
};

export const useUpdateAttribute = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()

            setToken(session?.user?.accessToken);
        }
        fetchSession();


    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ id, data }: Omit<UpdateAttributeOptions, 'token'>) => {
            if (token) {
                return updateAttribute({ id, data, token });
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
