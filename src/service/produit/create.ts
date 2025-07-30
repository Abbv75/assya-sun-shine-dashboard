import { axiosInstance } from "../../constant";
import { PRODUIT_T } from "../../types";

export const create = async (params: {
    nom: string,
    description ?: string
}) => {
    try {
        const { data } = await axiosInstance.post(`/produits`, params);

        return data as PRODUIT_T;
    } catch (error: any) {
        return false;
    }
};