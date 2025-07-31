import { Divider, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { CATEGORIE_T, LOADING_STATE_T, PRODUIT_T } from '../../types'
import { ProduitContext } from '../../providers/ProduitContext'
import { getAllProduit } from '../../service/produit'
import ListZone from '../../features/Produit/ListZone'
import { getAllCategorie } from '../../service/categorie'
import EditZone from '../../features/Produit/EditZone'
import GalerieZone from '../../features/Produit/GalerieZone'

const Produit = () => {
    const [categorieList, setcategorieList] = useState([] as CATEGORIE_T[]);
    const [produitList, setproduitList] = useState([] as PRODUIT_T[]);
    const [loadingState, setloadingState] = useState("En cours de chargement." as LOADING_STATE_T);
    const [produitToEdit, setproduitToEdit] = useState(undefined as PRODUIT_T | undefined);

    // galerie zone info
    const [produitGalerie, setproduitGalerie] = useState(undefined as PRODUIT_T | undefined);

    const loadCategorie = useCallback(async () => {
        try {
            const res = await getAllCategorie();
            if (!res) return;
            setcategorieList(res);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setloadingState(null);
        }
    }, []);

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
        loadCategorie();
    }, []);


    return (
        <ProduitContext.Provider value={{
            produitList, setproduitList,
            loadproduit,
            loadingState,
            produitToEdit, setproduitToEdit,
            categorieList,
            produitGalerie, setproduitGalerie
        }}>

            <Stack>
                <Typography level='h2'>Gestion des produits de produit</Typography>

                <Divider sx={{ width: 100 }} />

                <Stack mt={3} gap={1} >
                    <Stack direction={"row"} gap={1} flexWrap={'wrap'} justifyContent={"space-between"} alignItems={"center"} >

                        <EditZone />
                    </Stack>

                    <ListZone />

                    <GalerieZone />
                </Stack>
            </Stack>
        </ProduitContext.Provider>
    )
}

export default Produit