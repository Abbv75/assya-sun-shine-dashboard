import { createContext } from "react";
import { LOADING_STATE_T, USE_STATE_T, VENTE_T } from "../types";

export const VenteContext = createContext({} as {
    venteList: VENTE_T[], setventeList: USE_STATE_T<VENTE_T[]>,
    loadingState : LOADING_STATE_T
});