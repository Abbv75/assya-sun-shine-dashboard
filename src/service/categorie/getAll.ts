import { axiosInstance } from "../../constant";
import { CATEGORIE_T } from "../../types";

export const getAll = async () => {
    try {
        const { data } = await axiosInstance.get('/categories');

        return data as CATEGORIE_T[];
    } catch (error: any) {
        return false;
    }
};