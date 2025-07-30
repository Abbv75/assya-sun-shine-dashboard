import { createContext } from "react";
import { LOADING_STATE_T, PRODUIT_T, USE_STATE_T } from "../types";

export const ProduitContext = createContext({} as {
    produitList: PRODUIT_T[], setproduitList: USE_STATE_T<PRODUIT_T[]>,
    loadproduit: any,
    loadingState: LOADING_STATE_T,
    produitToEdit?: PRODUIT_T, setproduitToEdit: USE_STATE_T<PRODUIT_T | undefined>,
});