import { useContext } from 'react';
import { Grid, LinearProgress } from '@mui/joy';
import { VenteContext } from '../../providers/VenteContext';
import VenteCard from '../../components/VenteCard';
import { deleteVente } from '../../service/vente';
import { toast } from 'react-toastify';

const ListZone = () => {
    const { venteList, loadingState, setventeList } = useContext(VenteContext);

    const handleDelete = async (id: number) => {
        try {
            if (!window.confirm("Voulez-vous vraiment supprimer cet element ?")) return;

            const res = await deleteVente(id);
            if (!res) {
                toast.error("Suppression de l'element a échoué");
                return;
            }
            toast.success("Element supprimé avec succès");

            setventeList(prev => prev.filter(element => element.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Suppression de l'element a échoué");
        }
    }

    if (loadingState) {
        return <LinearProgress />
    }

    return (
        <Grid container spacing={4} mx={0} >
            {venteList.map((vente, index) => (
                <Grid xs={12} md={4} key={index} >
                    <VenteCard vente={vente} handleDelete={handleDelete} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ListZone