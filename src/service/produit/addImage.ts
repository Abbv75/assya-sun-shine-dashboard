import { axiosInstance } from "../../constant";

export const addImage = async (id: number, formData: FormData) => {
    try {
        const { data } = await axiosInstance.post(`/produits/image/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return data;
    } catch (error) {
        return false;
    }
};