import { useContext } from 'react';
import CustomTable from '../../components/CustomTable';
import { Avatar, AvatarGroup, ButtonGroup, IconButton, LinearProgress, Stack, Tooltip } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faPhotoVideo, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { deleteProduit } from '../../service/produit';
import { ProduitContext } from '../../providers/ProduitContext';
import { IMAGE_URL } from '../../constant';

const ListZone = () => {
    const { produitList, loadingState, setproduitList, setproduitToEdit } = useContext(ProduitContext);

    const handleDelete = async (id: number) => {
        try {
            if (!window.confirm("Voulez-vous vraiment supprimer cet element ?")) return;

            const res = await deleteProduit(id);
            if (!res) {
                toast.error("Suppression de l'element a échoué");
                return;
            }
            toast.success("Element supprimé avec succès");

            setproduitList(prev => prev.filter(element => element.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Suppression de l'element a échoué");
        }
    }

    if (loadingState) {
        return <LinearProgress />
    }

    return (
        <CustomTable
            theadCells={["", "Nom", "Prix D'achat", "Prix detaillant", "Prix d'engros", "Quantite", "Action",]}
            data={produitList.map((value) => ([
                value.images?.length ? (
                    <AvatarGroup size='sm' >
                        {value.images.map((image, index) => (
                            <>
                                {index < 2 && <Avatar key={index} src={`${IMAGE_URL}/${image.file}`} />}
                                {index == 2 && <Avatar key={index} children={<FontAwesomeIcon icon={faPhotoVideo} />} />}
                            </>

                        ))}
                    </AvatarGroup>
                ) : '',
                value.nom,
                value.prixAchat,
                value.prixVenteDetails,
                value.prixVenteEngros,
                value.quantite,
                (
                    <ButtonGroup>
                        <Tooltip title={`Modifier`} >
                            <IconButton
                                children={<FontAwesomeIcon icon={faFeather} />}
                                color='primary'
                                onClick={() => setproduitToEdit(value)}
                            />
                        </Tooltip>
                        <Tooltip title={`Supprimer`} color='danger' >
                            <IconButton
                                color='danger'
                                children={<FontAwesomeIcon icon={faTrashArrowUp} />}
                                onClick={() => handleDelete(value.id)}
                            />
                        </Tooltip>
                    </ButtonGroup>
                )
            ]))}
        />
    )
}

export default ListZone