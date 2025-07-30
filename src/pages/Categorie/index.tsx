import { Divider, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { CATEGORIE_T, LOADING_STATE_T, ROLE_T, USER_T } from '../../types'
import { getAllCategorie } from '../../service/categorie'
import { CategorieContext } from '../../providers/CategorieContext'
import ListZone from '../../features/Categorie/ListZone'
import EditZone from '../../features/Categorie/EditZone'

const Categorie = () => {
    const [categorieList, setcategorieList] = useState([] as CATEGORIE_T[]);
    const [loadingState, setloadingState] = useState("En cours de chargement." as LOADING_STATE_T);
    const [categorieToEdit, setcategorieToEdit] = useState(undefined as CATEGORIE_T | undefined);

    const loadCategorie = useCallback(async () => {
        try {
            setloadingState("En cours de chargement.");
            const res = await getAllCategorie();
            if (!res) return;
            setcategorieList(res);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setloadingState(null);
        }
    }, []);


    useEffect(() => {
        loadCategorie();
    }, []);


    return (
        <CategorieContext.Provider value={{
            categorieList, setcategorieList,
            loadCategorie,
            loadingState,
            categorieToEdit, setcategorieToEdit,
        }}>

            <Stack>
                <Typography level='h2'>Gestion des categories de produit</Typography>

                <Divider sx={{ width: 100 }} />

                <Stack mt={3} gap={1} >
                    <Stack direction={"row"} gap={1} flexWrap={'wrap'} justifyContent={"space-between"} alignItems={"center"} >

                        <EditZone/>
                        {/* <EditUserPassword /> */}
                    </Stack>

                    <ListZone />
                </Stack>
            </Stack>
        </CategorieContext.Provider>
    )
}

export default Categorie