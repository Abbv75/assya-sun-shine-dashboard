import { Avatar, Badge, Button, FormControl, FormLabel, Grid, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext, useRef, useState } from 'react';
import { ProduitContext } from '../../../providers/ProduitContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import ImageItem from './ImageItem';
import { LOADING_STATE_T } from '../../../types';
import { toast } from 'react-toastify';
import { addProduitImage } from '../../../service/produit';

const GalerieZone = () => {
    const { produitGalerie, setproduitGalerie, loadproduit } = useContext(ProduitContext);
    const [loadingState, setloadingState] = useState<LOADING_STATE_T>(null);
    const [nbrImage, setnbrImage] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = () => {
        const files = fileInputRef.current?.files;
        setnbrImage(files ? files.length : 0);
    };

    const OnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!produitGalerie || loadingState) return;

        const files = fileInputRef.current?.files;
        if (!files || files.length === 0) {
            toast.error("Veuillez sélectionner au moins une image.");
            return;
        }

        setloadingState("En cours de chargement.");

        try {
            //@ts-ignore
            for (const file of files) {
                const formData = new FormData();
                formData.append("image[]", file);

                const res = await addProduitImage(produitGalerie.id, formData);
                if (!res) {
                    throw new Error("Échec d'ajout d'une image");
                }
            }

            toast.success("Images ajoutées avec succès");
            loadproduit();
            setproduitGalerie(undefined);
        } catch (error) {
            console.error(error);
            toast.error("Ajout des images échoué");
        } finally {
            setloadingState(null);
            setnbrImage(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    if (!produitGalerie) return null;

    return (
        <Modal open={!!produitGalerie} onClose={() => setproduitGalerie(undefined)}>
            <ModalDialog
                sx={{ width: 'fit-content', maxWidth: '90%', minWidth: '400px' }}
                component='form'
                encType='multipart/form-data'
                onSubmit={OnSubmit}
            >
                <Typography level='h4'>Galerie des images du produit</Typography>
                <ModalClose />

                <Grid maxHeight={500} container spacing={2} mx={-1} sx={{
                    overflowY: 'auto'
                }} >
                    <Grid xs={3}>
                        <FormControl>
                            <FormLabel htmlFor="image[]">
                                <Badge badgeContent={nbrImage}>
                                    <Avatar size='lg'>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Avatar>
                                </Badge>
                            </FormLabel>
                            <input
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                type="file"
                                name="image[]"
                                multiple
                                accept="image/*"
                                id="image[]"
                                onChange={handleFileChange}
                                required
                            />
                        </FormControl>
                    </Grid>

                    {produitGalerie.images?.map((image, index) => (
                        <Grid xs={3} key={index}>
                            <ImageItem image={image} />
                        </Grid>
                    ))}
                </Grid>

                <Button
                    endDecorator={<FontAwesomeIcon icon={faPaperPlane} />}
                    type='submit'
                    variant='soft'
                    disabled={loadingState !== null}
                    loading={!!loadingState}
                >
                    Valider
                </Button>
            </ModalDialog>
        </Modal>
    );
};

export default GalerieZone;
