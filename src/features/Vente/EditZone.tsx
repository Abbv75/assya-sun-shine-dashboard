import { Button, Divider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import GenericForm from '../../components/GeneriqueForm';
import { CATEGORIE_T } from '../../types';
import { CategorieContext } from '../../providers/CategorieContext';
import { createCategorie, updateCategorie } from '../../service/categorie';

const EditZone = () => {
    const { setcategorieList, categorieList, categorieToEdit, setcategorieToEdit } = useContext(CategorieContext);

    const [isOpen, setisOpen] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            return await (
                categorieToEdit ? updateCategorie(categorieToEdit.id, data as any)
                    : createCategorie(data)
            );

        } catch (error) {
            return false;
        }
    };

    const onSubmitSuccess = (data: CATEGORIE_T) => {
        if (data) {
            if (categorieToEdit) {
                const index = categorieList.findIndex(t => t.id === categorieToEdit.id);
                if (index !== -1) {
                    categorieList[index] = data;
                    setcategorieList([...categorieList]);
                }
            } else {
                setcategorieList([...categorieList, data]);
            }

            setisOpen(false);
        }
    }

    useEffect(() => {
        categorieToEdit && setisOpen(true);
    }, [categorieToEdit])

    useEffect(
        () => {
            !isOpen && setcategorieToEdit(undefined);
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
                <Typography level='h4'>{categorieToEdit ? `Modifier` : `Ajouter`} une categorie</Typography>
                <Divider />

                <GenericForm<CATEGORIE_T>
                    fields={[{
                        name: 'nom',
                        label: 'Nom',
                        type: 'text',
                        required: true,
                        placeholder: 'Ex: Tournoi de janvier 2024',
                        xs: 12,
                        sm: 12,
                    }, {
                        name: 'description',
                        label: 'Description',
                        type: 'textarea',
                        xs: 12,
                    },]}
                    treatmentFonction={onSubmit as any}
                    submitButtonText="Valider"
                    cancelButtonText="Annuler"
                    initialData={categorieToEdit}
                    onCancel={() => { setisOpen(false) }}
                    onSubmitSuccess={onSubmitSuccess}
                />
            </ModalDialog>
        </Modal >
    )
}

export default EditZone