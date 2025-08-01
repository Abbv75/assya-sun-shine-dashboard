import { Card, Divider, Typography } from '@mui/joy';
import { memo, useContext } from 'react';
import { SelectedVenteContext } from '../../../providers/SelectedVenteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ClientZone = memo(() => {
    const { vente } = useContext(SelectedVenteContext);

    return (
        <Card>
            <Typography level='title-lg' >{vente?.client.nomComplet}</Typography>
            <Divider />

            <Typography
                startDecorator={<FontAwesomeIcon icon={faPhone} />}
                children={vente?.client.contact?.telephone}
                component={Link}
                to={`tel:${vente?.client.contact?.telephone}`}
            />

            {vente?.client.contact?.adresse && (
                <Typography
                    startDecorator={<FontAwesomeIcon icon={faLocationPin} />}
                    children={vente?.client.contact?.adresse}
                />
            )}

            {vente?.client.contact?.whatsapp && (
                <Typography
                    startDecorator={<FontAwesomeIcon icon={faLocationPin} />}
                    children={vente?.client.contact?.whatsapp}
                    component={Link}
                    to={`https://wa.me/${vente?.client.contact?.whatsapp}`}
                />
            )}

            {vente?.client.contact?.email && (
                <Typography
                    startDecorator={<FontAwesomeIcon icon={faLocationPin} />}
                    children={vente?.client.contact?.email}
                    component={Link}
                    to={`mailto:${vente?.client.contact?.email}`}
                />
            )}
        </Card>
    )
})

export default ClientZone