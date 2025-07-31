import { faChessPawn, faLock, faShoppingBag, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import User from "../pages/User";
import Categorie from "../pages/Categorie";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import Produit from "../pages/Produit";
import Vente from "../pages/Vente";

export default [
    {
        label: 'Gestion des utilisateurs',
        href: '/user',
        icon: faUsersGear,
        component: User,
        isPublic: false
    },
    {
        label: 'Gestion des categories',
        href: '/categorie',
        icon: faStackOverflow,
        component: Categorie,
        isPublic: false
    },
    {
        label: 'Gestion des produits',
        href: '/produit',
        icon: faChessPawn,
        component: Produit,
        isPublic: false
    },
    {
        label: 'Gestion des ventes',
        href: '/vente',
        icon: faShoppingBag,
        component: Vente,
        isPublic: false
    },
    {
        label: 'Connexion',
        href: '/connexion',
        icon: faLock,
        component: undefined,
        isPublic: false,
        toHide: true
    },
]