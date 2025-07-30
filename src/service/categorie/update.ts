import { axiosInstance } from "../../constant";
import { CATEGORIE_T } from "../../types";

export const update = async (id: string, params: {
    nom?: string,
    description?: string
}) => {
    try {
        const { data } = await axiosInstance.put(`/categories/${id}`, params);

        return data as CATEGORIE_T;
    } catch (error: any) {
        return false;
    }
};