import { axiosInstance } from "../../constant";
import { USER_T } from "../../types";

export const getAll = async () => {
    try {
        const { data } = await axiosInstance.get('/users');

        return data as USER_T[];
    } catch (error: any) {
        return false;
    }
};