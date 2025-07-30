import { axiosInstance } from "../../constant";
import { PRODUIT_T } from "../../types";

export const update = async (id: string, params: {
    nom?: string,
    description?: string
}) => {
    try {
        const { data } = await axiosInstance.put(`/produits/${id}`, params);

        return data as PRODUIT_T;
    } catch (error: any) {
        return false;
    }
};