import { Button, Divider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import GenericForm from '../../components/GeneriqueForm';
import { PRODUIT_T } from '../../types';
import { ProduitContext } from '../../providers/ProduitContext';
import { createProduit, updateProduit } from '../../service/produit';

const EditZone = () => {
    const { setproduitList, produitList, produitToEdit, setproduitToEdit, categorieList } = useContext(ProduitContext);

    const [isOpen, setisOpen] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            return await (
                produitToEdit ? updateProduit(produitToEdit.id, data as any)
                    : createProduit(data)
            );

        } catch (error) {
            return false;
        }
    };

    const onSubmitSuccess = (data: PRODUIT_T) => {
        if (data) {
            if (produitToEdit) {
                const index = produitList.findIndex(t => t.id === produitToEdit.id);
                if (index !== -1) {
                    produitList[index] = data;
                    setproduitList([...produitList]);
                }
            } else {
                setproduitList([...produitList, data]);
            }

            setisOpen(false);
        }
    }

    useEffect(() => {
        produitToEdit && setisOpen(true);
    }, [produitToEdit])

    useEffect(
        () => {
            !isOpen && setproduitToEdit(undefined);
        },
        [isOpen]
    )

    if (!isOpen) {
        return <Button children="Ajouter" onClick={() => setisOpen(true)} />;
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => setisOpen(false)}
        >
            <ModalDialog
                sx={{
                    width: 'fit-content',
                    maxWidth: '90%',
                    minWidth: '400px',
                }}
            >
                <ModalClose />
                <Typography level='h4'>{produitToEdit ? `Modifier` : `Ajouter`} une produit</Typography>
                <Divider />

                <GenericForm<PRODUIT_T>
                    fields={[
                        {
                            name: 'nom',
                            label: 'Nom',
                            type: 'text',
                            required: true,
                            placeholder: 'Ex: Robe de princesse',
                            xs: 12,
                            sm: 12,
                        },
                        {
                            name: 'prixAchat',
                            label: "Prix d'achat",
                            type: 'number',
                            required: true,
                            placeholder: 'Ex: 7500',
                            xs: 12,
                            sm: 6,
                        },
                        {
                            name: 'prixVenteDetails',
                            label: "Prix detaillant",
                            type: 'number',
                            required: true,
                            placeholder: 'Ex: 10000',
                            xs: 12,
                            sm: 6,
                        },
                        {
                            name: 'prixVenteEngros',
                            label: "Prix d'engros",
                            type: 'number',
                            required: true,
                            placeholder: 'Ex: 9000',
                            xs: 12,
                            sm: 6,
                        },
                        {
                            name: 'quantite',
                            label: "Quantité disponible",
                            type: 'number',
                            required: true,
                            placeholder: 'Ex: 50',
                            xs: 12,
                            sm: 6,
                        },
                        {
                            name: 'id_categorie',
                            label: "Catégorie du produit",
                            type: 'select',
                            required: true,
                            options: categorieList.map(value => ({
                                label: value.nom,
                                value: value.id
                            })),
                            xs: 12,
                        },
                    ]}
                    treatmentFonction={onSubmit as any}
                    submitButtonText="Valider"
                    cancelButtonText="Annuler"
                    initialData={produitToEdit}
                    onCancel={() => { setisOpen(false) }}
                    onSubmitSuccess={onSubmitSuccess}
                />
            </ModalDialog>
        </Modal >
    )
}

export default EditZone