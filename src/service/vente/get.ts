import { axiosInstance } from "../../constant";
import { VENTE_T } from "../../types";

export const get = async (id: number) => {
    try {
        const { data } = await axiosInstance.get(`/ventes/${id}`);

        return data as VENTE_T;
    } catch (error: any) {
        return false;
    }
};