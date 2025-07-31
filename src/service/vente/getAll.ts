import { axiosInstance } from "../../constant";
import { VENTE_T } from "../../types";

export const getAll = async () => {
    try {
        const { data } = await axiosInstance.get('/ventes');

        return data as VENTE_T[];
    } catch (error: any) {
        return false;
    }
};