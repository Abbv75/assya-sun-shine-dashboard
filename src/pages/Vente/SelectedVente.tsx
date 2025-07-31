import { Divider, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { LOADING_STATE_T, PRODUIT_T, VENTE_T } from '../../types'
import { VenteContext } from '../../providers/VenteContext'
import { getAllVente } from '../../service/vente'
import ListZone from '../../features/Vente/ListZone'

const SelectedVente = () => {
    const [venteList, setventeList] = useState([] as VENTE_T[]);
    const [loadingState, setloadingState] = useState("En cours de chargement." as LOADING_STATE_T);

    const loadvente = useCallback(async () => {
        try {
            setloadingState("En cours de chargement.");
            const res = await getAllVente();
            if (!res) return;
            setventeList(res);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setloadingState(null);
        }
    }, []);

    useEffect(() => {
        loadvente();
    }, []);


    return (
        <VenteContext.Provider value={{
            venteList, setventeList,
            loadingState
        }}>

            <Stack>
                <Typography level='h2'>Gestion des ventes</Typography>

                <Divider sx={{ width: 100 }} />

                <Stack mt={3} gap={1} >
                    <ListZone />
                </Stack>
            </Stack>
        </VenteContext.Provider>
    )
}

export default SelectedVente