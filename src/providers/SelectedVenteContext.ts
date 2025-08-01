import { createContext } from "react";
import { LOADING_STATE_T, USE_STATE_T, VENTE_T } from "../types";

export const SelectedVenteContext = createContext({} as {
    vente?: VENTE_T, setvente: USE_STATE_T<VENTE_T | undefined>,
    loadingState : LOADING_STATE_T
});