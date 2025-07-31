import { axiosInstance } from "../../constant";

export const deleteVente = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`/ventes/${id}`);

        return data;
    } catch (error: any) {
        return false;
    }
};