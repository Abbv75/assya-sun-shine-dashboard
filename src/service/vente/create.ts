import { axiosInstance } from "../../constant";
import { CATEGORIE_T } from "../../types";

export const create = async (params: {
    nom: string,
    description ?: string
}) => {
    try {
        const { data } = await axiosInstance.post(`/categories`, params);

        return data as CATEGORIE_T;
    } catch (error: any) {
        return false;
    }
};