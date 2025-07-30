import { createContext } from "react";
import { CATEGORIE_T, LOADING_STATE_T, USE_STATE_T } from "../types";

export const CategorieContext = createContext({} as {
    categorieList: CATEGORIE_T[], setcategorieList: USE_STATE_T<CATEGORIE_T[]>,
    loadCategorie: any,
    loadingState: LOADING_STATE_T,
    categorieToEdit?: CATEGORIE_T, setcategorieToEdit: USE_STATE_T<CATEGORIE_T | undefined>,
});