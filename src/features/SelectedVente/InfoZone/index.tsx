import { Grid } from '@mui/joy';
import ClientZone from './ClientZone';
import { memo } from 'react';

const InfoZone = memo(() => {
    return (
        <Grid container >
            <Grid xs={12} md={6}>
                <ClientZone />
            </Grid>
        </Grid>
    )
})

export default InfoZone