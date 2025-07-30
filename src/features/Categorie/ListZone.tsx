import { useContext } from 'react';
import CustomTable from '../../components/CustomTable';
import { ButtonGroup, IconButton, LinearProgress, Tooltip } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { CategorieContext } from '../../providers/CategorieContext';
import { deleteCategorie } from '../../service/categorie';

const ListZone = () => {
    const { categorieList, loadingState, setcategorieList, setcategorieToEdit } = useContext(CategorieContext);

    const handleDelete = async (id: string) => {
        try {
            if (!window.confirm("Voulez-vous vraiment supprimer cet element ?")) return;

            const res = await deleteCategorie(id);
            if (!res) {
                toast.error("Suppression de l'element a échoué");
                return;
            }
            toast.success("Element supprimé avec succès");

            setcategorieList(prev => prev.filter(element => element.id !== id));
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
            theadCells={["Nom", "Description", "Action",]}
            data={categorieList.map((value, index) => ([
                value.nom,
                value.description,
                (
                    <ButtonGroup>
                        <Tooltip title={`Modifier`} >
                            <IconButton
                                children={<FontAwesomeIcon icon={faFeather} />}
                                color='primary'
                                onClick={() => setcategorieToEdit(value)}
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