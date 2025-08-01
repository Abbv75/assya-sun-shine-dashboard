import { Card, Divider, Typography } from '@mui/joy';
import { memo, useContext } from 'react';
import { SelectedVenteContext } from '../../../providers/SelectedVenteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { numberInXOF } from '../../../helpers/numberInXOF';

const StatZone = memo(() => {
    const { vente } = useContext(SelectedVenteContext);

    if (!vente) return null;

    return (
        <Card>
            <Typography level='title-lg' >Numero de recu: #{vente.id}</Typography>
            <Divider />

            <Typography>
                Nombre de produit : {vente.produits.reduce((sum, produit) => sum + produit.quantite, 0).toLocaleString()}
            </Typography>
            
            <Typography>
                Montant total : {numberInXOF(vente.montant)}
            </Typography>

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

export default StatZone