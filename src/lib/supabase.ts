import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
};

export type TypeAlerte = {
  id: number;
  libelle: string;
  description: string | null;
  created_by: number | null;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Alerte = {
  id: number;
  reference: string;
  intitule: string;
  type_alerte_id: number | null;
  date: string | null;
  severite: string | null;
  etat: string | null;
  date_initial: string | null;
  date_traite: string | null;
  concerne: string | null;
  risque: string | null;
  systemes_affectes: string | null;
  synthese: string | null;
  solution: string | null;
  source: string | null;
  file_url: string | null;
  created_by: number | null;
  updated_by: number | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  type_alerte?: TypeAlerte;
};

export type Rapport = {
  id: string;
  title: string;
  summary: string;
  category: string;
  file_url: string | null;
  published_at: string;
  created_at: string;
};

export type Bulletin = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  published_at: string;
  created_at: string;
};

export type Documentation = {
  id: string;
  title: string;
  type: 'video' | 'article' | 'legal' | 'pdf';
  category: string;
  url: string;
  thumbnail_url: string | null;
  description: string;
  created_at: string;
};

export type Incident = {
  // --- Déclaration ---
  declaration: 'initiale' | 'intermediaire' | 'post-mortem';
  date_declaration?: string; // format YYYY-MM-DD

  // --- Informations sur l’organisation ---
  denomination_org?: string;
  type_org?: string;
  fournisseur?: string;
  partie_prenan?: string;
  fonction_declarant?: string;
  adresse?: string;
  telephone?: string;
  email?: string;

  // --- Détails de l’incident ---
  date_incident?: string;
  duree_inci_clos?: string;
  incident_decouve?: string;
  incident_decouve_autre?: string;
  origine_incident?: string;
  moyens_inden_supp?: string;
  moyens_inden_supp_autre?: string;
  description_moyens?: string;
  objectif_attaquant?: string;
  objectif_attaquant_autre?: string;
  action_realise?: string;
  action_realise_autre?: string;
  desc_gene_icident?: string;
  action_immediates?: string;

  // --- Impacts et services affectés ---
  indentification_activ_affect?: string;
  indentification_activ_affect_autre?: string;
  indentification_serv_affect?: string;
  indentification_serv_affect_autre?: string;
  impact_averer?: string[]; // tableau JSON
  poucentage_utili?: string;
  services_essentiels?: string;

  // --- Parties externes ---
  tiers_systeme?: string;
  partie_prenant_incident?: string;
  maniere_partie_prenant_incident?: string;

  // --- Actions correctives et mesures ---
  action_cond_entre?: string[]; // tableau JSON
  decription_mesure_tech?: string;

  // --- Communication et gestion ---
  incident_remonte_externe?: string;
  dispositif_gestion_active?: string;
  incident_connu_public?: string;
  prestataire_externe_incident?: string;
  denomination_sociale_prestataire?: string;
  telephone_prestataire?: string;

  // --- Métadonnées ---
  created_at?: string;
  updated_at?: string;
};
