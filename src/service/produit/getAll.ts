import { axiosInstance } from "../../constant";
import { PRODUIT_T } from "../../types";

export const getAll = async () => {
    try {
        const { data } = await axiosInstance.get('/produits');

        return data as PRODUIT_T[];
    } catch (error: any) {
        return false;
    }
};