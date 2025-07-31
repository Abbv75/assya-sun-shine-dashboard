import React, { useContext, useState } from 'react'
import { IMAGE_T, LOADING_STATE_T } from '../../../types'
import { Badge, Skeleton, Stack } from '@mui/joy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { CardMedia } from '@mui/material'
import { IMAGE_URL } from '../../../constant'
import { deleteProduitImage } from '../../../service/produit'
import { toast } from 'react-toastify'
import { ProduitContext } from '../../../providers/ProduitContext'

const ImageItem = React.memo(({ image, }: { image: IMAGE_T, }) => {
    const { loadproduit } = useContext(ProduitContext);
    const [loadingState, setloadingState] = useState(null as LOADING_STATE_T);

    const handleDelete = async () => {
        try {
            if (!window.confirm("Voulez-vous vraiment supprimer cet element ?")) return;
            setloadingState("En cours de chargement.");

            const res = await deleteProduitImage(image.id);
            if (!res) {
                toast.error("Suppression de l'element a échoué");
                return;
            }
            loadproduit();
            toast.success("Element supprimé avec succès");

        } catch (error) {
            console.error(error);
            toast.error("Suppression de l'element a échoué");
        }
    }

    return (
        <Badge
            badgeContent={<FontAwesomeIcon icon={faTimes} />}
            sx={{
                cursor: 'pointer',
                filter : !!loadingState ? 'grayscale(100%)' : 'grayscale(0%)',
            }}
            color='danger'
            variant='soft'
            onClick={handleDelete}
        >
            <CardMedia
                component='img'
                src={`${IMAGE_URL}/${image.file}`}
                sx={{
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                }}
            />
        </Badge>
    )
})

export default ImageItem