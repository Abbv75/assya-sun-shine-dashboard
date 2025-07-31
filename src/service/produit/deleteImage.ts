import { axiosInstance } from "../../constant";

export const deleteImage = async (id: number) => {
    try {
        const { data } = await axiosInstance.delete(`/produits/image/${id}`);

        return data;
    } catch (error: any) {
        return false;
    }
};