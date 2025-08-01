import { Breadcrumbs, Divider, Stack, Tab, tabClasses, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { LOADING_STATE_T, VENTE_T } from '../../types'
import { getVente } from '../../service/vente'
import { useParams } from 'react-router-dom'
import ListProduitZone from '../../features/SelectedVente/ListProduitZone'
import { SelectedVenteContext } from '../../providers/SelectedVenteContext'
import { Skeleton } from '@mui/material'
import InfoZone from '../../features/SelectedVente/InfoZone'

const SelectedVente = () => {
    const { idVente } = useParams();

    const [vente, setvente] = useState(undefined as VENTE_T | undefined);
    const [loadingState, setloadingState] = useState("En cours de chargement." as LOADING_STATE_T);

    const loadvente = useCallback(async () => {
        try {
            setloadingState("En cours de chargement.");
            const res = await getVente(idVente as any);

            if (!res) return;
            setvente(res);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setloadingState(null);
        }
    }, []);

    useEffect(() => {
        loadvente();
    }, []);

    if (!!loadingState) {
        return (
            <Stack>
                <Skeleton height={50} width={200} />
                <Skeleton height={500} />
            </Stack>
        )
    }


    return (
        <SelectedVenteContext.Provider value={{
            vente, setvente,
            loadingState
        }}>
            <Stack>
                <Breadcrumbs>
                    <Typography level='h2'>Gestion des ventes</Typography>
                    <Typography level='h2'>{idVente}</Typography>
                </Breadcrumbs>

                <Divider sx={{ width: 100 }} />

                <Tabs defaultValue={0} sx={{ bgcolor: 'transparent', mt: 5 }}>
                    <TabList
                        disableUnderline
                        sx={{
                            p: 0.5,
                            borderRadius: 'xl',
                            bgcolor: 'background.level1',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                            },
                        }}
                        tabFlex="auto"
                    >
                        <Tab disableIndicator>
                            <Typography level='title-md'>Information global</Typography>
                        </Tab>
                        <Tab disableIndicator>
                            <Typography level='title-md'>Liste des produits</Typography>
                        </Tab>
                    </TabList>

                    <TabPanel
                        value={0}
                    >
                        <InfoZone />
                    </TabPanel>

                    <TabPanel
                        value={1}
                    >
                        <ListProduitZone />
                    </TabPanel>
                </Tabs>
            </Stack>
        </SelectedVenteContext.Provider>
    )
}

export default SelectedVente