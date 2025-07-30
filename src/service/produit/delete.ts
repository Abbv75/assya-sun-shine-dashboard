import { axiosInstance } from "../../constant";

export const deleteProduit = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`/produits/${id}`);

        return data;
    } catch (error: any) {
        return false;
    }
};