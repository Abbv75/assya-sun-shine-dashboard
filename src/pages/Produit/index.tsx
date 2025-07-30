import { Divider, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { LOADING_STATE_T, PRODUIT_T } from '../../types'
import { ProduitContext } from '../../providers/ProduitContext'
import { getAllProduit } from '../../service/produit'
import ListZone from '../../features/Produit/ListZone'

const Produit = () => {
    const [produitList, setproduitList] = useState([] as PRODUIT_T[]);
    const [loadingState, setloadingState] = useState("En cours de chargement." as LOADING_STATE_T);
    const [produitToEdit, setproduitToEdit] = useState(undefined as PRODUIT_T | undefined);

    const loadproduit = useCallback(async () => {
        try {
            setloadingState("En cours de chargement.");
            const res = await getAllProduit();
            if (!res) return;
            setproduitList(res);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setloadingState(null);
        }
    }, []);


    useEffect(() => {
        loadproduit();
    }, []);


    return (
        <ProduitContext.Provider value={{
            produitList, setproduitList,
            loadproduit,
            loadingState,
            produitToEdit, setproduitToEdit,
        }}>

            <Stack>
                <Typography level='h2'>Gestion des produits de produit</Typography>

                <Divider sx={{ width: 100 }} />

                <Stack mt={3} gap={1} >
                    <Stack direction={"row"} gap={1} flexWrap={'wrap'} justifyContent={"space-between"} alignItems={"center"} >

                        {/* <EditZone /> */}
                    </Stack>

                    <ListZone />
                </Stack>
            </Stack>
        </ProduitContext.Provider>
    )
}

export default Produit