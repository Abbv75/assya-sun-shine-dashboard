import { useContext } from 'react';
import { Stack } from '@mui/joy';
import TournoiCard from '../../components/TournoiCard';
import { TournoiContext } from '../../providers/TournoiContext';

const ListZone = () => {
    const { tournoiList } = useContext(TournoiContext);

    return (
        <Stack
            direction='row'
            flexWrap='wrap'
            gap={2}
        >
            {tournoiList.map((tournoi) => (
                <TournoiCard tournoi={tournoi} />
            ))}
        </Stack>
    )
}

export default ListZone