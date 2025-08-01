export type USE_STATE_T<T> = React.Dispatch<React.SetStateAction<T>>

export type LOADING_STATE_T = "En cours de chargement."
  | "Chargement finit."
  | "Chargement échoué."
  | "Chargememnt reussi"
  | "En attente"
  | null;

export type ROLE_T = {
  id: string;
  nom: string;
  description: string;
};

export interface CATEGORIE_T {
  id: string;
  nom: string;
  description: string;
};

export type CONTACT_T = {
  id: string;
  telephone: string;
  email?: string;
  adresse?: string;
  whatsapp?: string;
};

export type USER_T = {
  id: string;
  nomComplet: string;
  login: string;
  id_role: string;
  id_contact: string;
  createdAt?: string;
  updatedAt?: string;
  role?: ROLE_T;
  contact?: CONTACT_T;
};

export type CLIENT_T = {
  id: string;
  nomComplet: string;
  id_contact: string;
  contact?: CONTACT_T;
};

export interface IMAGE_T {
  id: number,
  file: string,
  id_produit: number
}

export interface PRODUIT_T {
  id: number,
  nom: string,
  prixAchat: number,
  prixVenteDetails: number,
  prixVenteEngros: number,
  quantite: number,
  id_categorie?: number,
  categorie: CATEGORIE_T,
  images?: IMAGE_T[],
  pivot?: {
    id_produit: number,
    id_vente: number,
    quantite: number,
    montant: number,
  }
};

export interface VENTE_T {
  id: number,
  montant: number,
  id_client: number,
  id_produit: number,
  client: CLIENT_T,
  produits: PRODUIT_T[],
  created_at: string,
  updated_at: string
};

