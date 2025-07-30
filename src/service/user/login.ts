import { axiosInstance } from "../../constant";
import { USER_T } from "../../types";

export const login = async (login: string, password: string) => {
    try {
        const { data } = await axiosInstance.post('/users/login', { login, password });

        localStorage.setItem('currentUser', JSON.stringify(data));

        return data as USER_T;
    } catch (error: any) {
        return false;
    }
};