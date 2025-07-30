import { axiosInstance } from "../../constant";
import { USER_T } from "../../types";

export const create = async (user: {
    nom: string,
    login: string,
    motDePasse: string,
    id_role: string,
    idCOD?: string,
    telephone: 'string',
    email?: 'string',
    whatsapp?: 'string',
    adresse?: 'string',
}) => {
    try {
        const { data } = await axiosInstance.post(`/user`, user);

        return data.data as USER_T;
    } catch (error: any) {
        return false;
    }
};