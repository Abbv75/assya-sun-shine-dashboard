import React, { useContext } from 'react'
import CustomTable from '../../components/CustomTable'
import { SelectedVenteContext } from '../../providers/SelectedVenteContext'
import { Avatar, AvatarGroup, Typography } from '@mui/joy';
import { IMAGE_URL } from '../../constant';
import { numberInXOF } from '../../helpers/numberInXOF';

const ListProduitZone = () => {
  const { vente } = useContext(SelectedVenteContext);

  if (!vente || !vente?.produits) {
    return (
      <Typography>Liste introuvable</Typography>
    )
  }

  return (
    <CustomTable
      theadCells={['#', 'Produit', 'Quantité', 'Montant']}
      data={vente.produits.map((produit) => [
        (
          <AvatarGroup
            size='sm'
            sx={{ cursor: 'pointer' }}
          >
            {produit.images
              ?.slice(0, 2)
              ?.map((image, index) => (
                <Avatar key={index} src={`${IMAGE_URL}/${image.file}`} />
              ))
            }
          </AvatarGroup>
        ),
        produit.nom,
        produit.pivot?.quantite,
        numberInXOF(produit.pivot?.montant || 0),
      ])}

    />
  )
}

export default ListProduitZone