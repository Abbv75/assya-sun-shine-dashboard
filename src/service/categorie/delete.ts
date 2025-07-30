import { axiosInstance } from "../../constant";

export const deleteCategorie = async (id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/categories/${id}`);

        return data;
    } catch (error: any) {
        return false;
    }
};