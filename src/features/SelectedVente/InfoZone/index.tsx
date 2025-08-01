import { Grid } from '@mui/joy';
import ClientZone from './ClientZone';
import { memo } from 'react';
import StatZone from './StatZone';

const InfoZone = memo(() => {
    return (
        <Grid container spacing={2} m={0} >
            <Grid xs={12} md={6}>
                <ClientZone />
            </Grid>
            <Grid xs={12} md={6}>
                <StatZone />
            </Grid>
        </Grid>
    )
})

export default InfoZone