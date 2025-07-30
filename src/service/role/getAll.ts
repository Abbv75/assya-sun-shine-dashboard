import { axiosInstance } from "../../constant";
import { ROLE_T } from "../../types";

export default async () => {
    try {
        const { data } = await axiosInstance.get('/roles');

        return data.data as ROLE_T[];
    } catch (error: any) {
        return false;
    }
};