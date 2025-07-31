import { Avatar, Button, ButtonGroup, Card, Divider, Typography } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faChessPawn, faMoneyBill, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { blue } from '@mui/material/colors';
import { VENTE_T } from '../../types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const VenteCard = memo(({ vente, handleDelete }: { vente: VENTE_T, handleDelete: (id: number) => unknown }) => {
    return (
        <Card sx={{
            borderLeft: `2px solid ${blue[500]}`,
        }} >
            <Typography level='title-md' >{vente.updated_at}</Typography>
            <Divider />

            <Typography
                startDecorator={
                    <Avatar size='sm' children={<FontAwesomeIcon icon={faMoneyBill} />} />
                }
                level='body-md'
            >
                {vente.montant.toLocaleString()} FCFA
            </Typography>

            <Typography
                startDecorator={
                    <Avatar size='sm' children={<FontAwesomeIcon icon={faChessPawn} />} />
                }
                level='body-md'
            >
                {vente.produits?.length} produits
            </Typography>

            <Divider />

            <ButtonGroup variant='soft' >
                <Button
                    endDecorator={<FontAwesomeIcon icon={faAngleRight} />}
                    fullWidth
                    color='primary'
                    component={Link}
                    to={`/selectedVente/${vente.id}`}
                >Plus d'informations</Button>
                <Button
                    endDecorator={<FontAwesomeIcon icon={faTrashArrowUp} />}
                    color='danger'
                    onClick={() => handleDelete(vente.id)}
                >Supprimer</Button>
            </ButtonGroup>
        </Card>
    )
})

export default VenteCard