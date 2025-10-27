import { useState } from 'react';
import { supabase, Incident } from '../lib/supabase';
import { AlertTriangle, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

export default function IncidentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Incident>({
    declaration: 'initiale',
    denomination_org: '',
    type_org: '',
    fournisseur: '',
    partie_prenan: '',
    fonction_declarant: '',
    adresse: '',
    telephone: '',
    date_incident: '',
    duree_inci_clos: '',
    incident_decouve: '',
    incident_decouve_autre: '',
    origine_incident: '',
    moyens_inden_supp: '',
    moyens_inden_supp_autre: '',
    description_moyens: '',
    objectif_attaquant: '',
    objectif_attaquant_autre: '',
    action_realise: '',
    action_realise_autre: '',
    desc_gene_icident: '',
    action_immediates: '',
    indentification_activ_affect: '',
    indentification_activ_affect_autre: '',
    indentification_serv_affect: '',
    indentification_serv_affect_autre: '',
    impact_averer: [],
    poucentage_utili: '',
    services_essentiels: undefined,
    tiers_systeme: '',
    partie_prenant_incident: undefined,
    maniere_partie_prenant_incident: '',
    action_cond_entre: [],
    decription_mesure_tech: '',
    incident_remonte_externe: undefined,
    dispositif_gestion_active: undefined,
    incident_connu_public: undefined,
    prestataire_externe_incident: undefined,
    denomination_sociale_prestataire: '',
    telephone_prestataire: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (name: 'impact_averer' | 'action_cond_entre', value: string) => {
    const currentArray = formData[name] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setFormData({ ...formData, [name]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('incidents').insert([formData]);

    setIsSubmitting(false);

    if (!error) {
      setIsSubmitted(true);
      setCurrentStep(1);
    } else {
      alert('Erreur lors de la soumission. Veuillez réessayer.');
    }
  };

  const nextStep = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Incident déclaré avec succès</h2>
          <p className="text-gray-600 mb-8">
            Votre déclaration a été enregistrée. Notre équipe va analyser votre incident et vous
            contactera dans les plus brefs délais.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                declaration: 'initiale',
                denomination_org: '',
                type_org: '',
                fournisseur: '',
                partie_prenan: '',
                fonction_declarant: '',
                adresse: '',
                telephone: '',
                date_incident: '',
                duree_inci_clos: '',
                incident_decouve: '',
                incident_decouve_autre: '',
                origine_incident: '',
                moyens_inden_supp: '',
                moyens_inden_supp_autre: '',
                description_moyens: '',
                objectif_attaquant: '',
                objectif_attaquant_autre: '',
                action_realise: '',
                action_realise_autre: '',
                desc_gene_icident: '',
                action_immediates: '',
                indentification_activ_affect: '',
                indentification_activ_affect_autre: '',
                indentification_serv_affect: '',
                indentification_serv_affect_autre: '',
                impact_averer: [],
                poucentage_utili: '',
                services_essentiels: undefined,
                tiers_systeme: '',
                partie_prenant_incident: undefined,
                maniere_partie_prenant_incident: '',
                action_cond_entre: [],
                decription_mesure_tech: '',
                incident_remonte_externe: undefined,
                dispositif_gestion_active: undefined,
                incident_connu_public: undefined,
                prestataire_externe_incident: undefined,
                denomination_sociale_prestataire: '',
                telephone_prestataire: '',
              });
            }}
            className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
          >
            Déclarer un nouvel incident
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    'Type de déclaration',
    'Organisation',
    'Incident',
    'Découverte & Origine',
    'Impact',
    'Actions',
    'Informations complémentaires'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Déclarer un Incident</h1>
          </div>
          <p className="text-xl text-red-100">
            Signalez un incident de sécurité pour une prise en charge rapide
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    index + 1 === currentStep
                      ? 'bg-red-600 text-white scale-110'
                      : index + 1 < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-sm font-semibold text-red-600">{steps[currentStep - 1]}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Type de déclaration */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Type de déclaration</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de déclaration <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="declaration"
                    value={formData.declaration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="initiale">Déclaration initiale</option>
                    <option value="intermediaire">Déclaration intermédiaire</option>
                    <option value="post-mortem">Déclaration post-mortem</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    Choisissez "initiale" si c'est la première fois que vous déclarez cet incident
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Organisation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Informations sur l'organisation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dénomination de l'organisation
                    </label>
                    <input
                      type="text"
                      name="denomination_org"
                      value={formData.denomination_org}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Nom de votre organisation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type d'organisation
                    </label>
                    <input
                      type="text"
                      name="type_org"
                      value={formData.type_org}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="PME, Grande entreprise, Administration..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fournisseur
                    </label>
                    <input
                      type="text"
                      name="fournisseur"
                      value={formData.fournisseur}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Nom du fournisseur si applicable"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Partie prenante
                    </label>
                    <input
                      type="text"
                      name="partie_prenan"
                      value={formData.partie_prenan}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Parties prenantes concernées"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fonction du déclarant
                    </label>
                    <input
                      type="text"
                      name="fonction_declarant"
                      value={formData.fonction_declarant}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Votre fonction dans l'organisation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="+226 00 00 00 00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Adresse complète"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Incident */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Informations sur l'incident</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de l'incident
                    </label>
                    <input
                      type="text"
                      name="date_incident"
                      value={formData.date_incident}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: 15 janvier 2025 à 14h30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée de l'incident (si clos)
                    </label>
                    <input
                      type="text"
                      name="duree_inci_clos"
                      value={formData.duree_inci_clos}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: 2 heures, 3 jours..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description générale de l'incident <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="desc_gene_icident"
                    value={formData.desc_gene_icident}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Décrivez l'incident de manière détaillée..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actions immédiates prises
                  </label>
                  <textarea
                    name="action_immediates"
                    value={formData.action_immediates}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Actions prises immédiatement après la découverte..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Découverte & Origine */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Découverte et origine</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment l'incident a été découvert
                    </label>
                    <input
                      type="text"
                      name="incident_decouve"
                      value={formData.incident_decouve}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: Alerte système, rapport utilisateur..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Autre moyen de découverte
                    </label>
                    <input
                      type="text"
                      name="incident_decouve_autre"
                      value={formData.incident_decouve_autre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Si autre, précisez"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origine de l'incident
                  </label>
                  <input
                    type="text"
                    name="origine_incident"
                    value={formData.origine_incident}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ex: Attaque externe, erreur interne, malware..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moyens d'identification supplémentaires
                    </label>
                    <input
                      type="text"
                      name="moyens_inden_supp"
                      value={formData.moyens_inden_supp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Outils utilisés pour l'analyse"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Autre moyen (précisez)
                    </label>
                    <input
                      type="text"
                      name="moyens_inden_supp_autre"
                      value={formData.moyens_inden_supp_autre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Si autre, précisez"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description des moyens d'identification
                  </label>
                  <textarea
                    name="description_moyens"
                    value={formData.description_moyens}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Détaillez les moyens techniques utilisés..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Objectif de l'attaquant
                    </label>
                    <input
                      type="text"
                      name="objectif_attaquant"
                      value={formData.objectif_attaquant}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: Vol de données, ransomware, sabotage..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Autre objectif (précisez)
                    </label>
                    <input
                      type="text"
                      name="objectif_attaquant_autre"
                      value={formData.objectif_attaquant_autre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Si autre, précisez"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Actions réalisées par l'attaquant
                    </label>
                    <input
                      type="text"
                      name="action_realise"
                      value={formData.action_realise}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: Chiffrement de données, exfiltration..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Autre action (précisez)
                    </label>
                    <input
                      type="text"
                      name="action_realise_autre"
                      value={formData.action_realise_autre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Si autre, précisez"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Impact */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Impact de l'incident</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activités affectées
                    </label>
                    <input
                      type="text"
                      name="indentification_activ_affect"
                      value={formData.indentification_activ_affect}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Activités métier impactées"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Autre activité (précisez)
                    </label>
                    <input
                      type="text"
                      name="indentification_activ_affect_autre"
                      value={formData.indentification_activ_affect_autre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Si autre, précisez"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services affectés
                    </label>
                    <input
                      type="text"
                      name="indentification_serv_affect"
                      value={formData.indentification_serv_affect}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Services IT ou métier impactés"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Autre service (précisez)
                    </label>
                    <input
                      type="text"
                      name="indentification_serv_affect_autre"
                      value={formData.indentification_serv_affect_autre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Si autre, précisez"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Impact avéré (sélectionnez tout ce qui s'applique)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Perte de disponibilité', 'Perte de confidentialité', 'Perte d\'intégrité', 'Impact financier', 'Impact réputationnel', 'Impact opérationnel'].map((impact) => (
                      <label key={impact} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.impact_averer?.includes(impact) || false}
                          onChange={() => handleCheckbox('impact_averer', impact)}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{impact}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pourcentage d'utilisateurs affectés
                    </label>
                    <input
                      type="text"
                      name="poucentage_utili"
                      value={formData.poucentage_utili}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: 30%, 100%, quelques utilisateurs..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services essentiels impactés ?
                    </label>
                    <select
                      name="services_essentiels"
                      value={formData.services_essentiels || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="oui">Oui</option>
                      <option value="non">Non</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Systèmes tiers affectés
                  </label>
                  <input
                    type="text"
                    name="tiers_systeme"
                    value={formData.tiers_systeme}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Systèmes de partenaires ou fournisseurs affectés"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parties prenantes notifiées ?
                    </label>
                    <select
                      name="partie_prenant_incident"
                      value={formData.partie_prenant_incident || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="oui">Oui</option>
                      <option value="non">Non</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manière de notification
                    </label>
                    <input
                      type="text"
                      name="maniere_partie_prenant_incident"
                      value={formData.maniere_partie_prenant_incident}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Email, téléphone, courrier..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Actions */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Actions menées</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Actions conduites par l'entreprise (sélectionnez tout ce qui s'applique)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Isolation des systèmes', 'Analyse forensique', 'Restauration des sauvegardes', 'Changement des mots de passe', 'Notification aux autorités', 'Communication interne', 'Communication externe'].map((action) => (
                      <label key={action} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.action_cond_entre?.includes(action) || false}
                          onChange={() => handleCheckbox('action_cond_entre', action)}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description des mesures techniques prises
                  </label>
                  <textarea
                    name="decription_mesure_tech"
                    value={formData.decription_mesure_tech}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Décrivez en détail les mesures techniques mises en place..."
                  />
                </div>
              </div>
            )}

            {/* Step 7: Informations complémentaires */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Informations complémentaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Incident remonté aux autorités externes ?
                    </label>
                    <select
                      name="incident_remonte_externe"
                      value={formData.incident_remonte_externe || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="oui">Oui</option>
                      <option value="non">Non</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dispositif de gestion activé ?
                    </label>
                    <select
                      name="dispositif_gestion_active"
                      value={formData.dispositif_gestion_active || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="oui">Oui</option>
                      <option value="non">Non</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Incident connu du public ?
                    </label>
                    <select
                      name="incident_connu_public"
                      value={formData.incident_connu_public || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="oui">Oui</option>
                      <option value="non">Non</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prestataire externe impliqué ?
                    </label>
                    <select
                      name="prestataire_externe_incident"
                      value={formData.prestataire_externe_incident || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="oui">Oui</option>
                      <option value="non">Non</option>
                    </select>
                  </div>
                </div>
                {formData.prestataire_externe_incident === 'oui' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dénomination sociale du prestataire
                      </label>
                      <input
                        type="text"
                        name="denomination_sociale_prestataire"
                        value={formData.denomination_sociale_prestataire}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Nom du prestataire"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone du prestataire
                      </label>
                      <input
                        type="tel"
                        name="telephone_prestataire"
                        value={formData.telephone_prestataire}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                  </div>
                )}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important :</strong> Ne partagez pas d'informations sensibles telles que des
                    mots de passe, clés privées ou données personnelles dans ce formulaire.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Précédent</span>
                </button>
              )}
              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  <span>Suivant</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Soumettre l\'incident'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
