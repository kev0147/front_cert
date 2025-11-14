import { useState } from 'react';
import { Incident } from '../lib/supabase';
import { AlertTriangle, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

export default function IncidentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Incident>({
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
    impact_averer: '',
    poucentage_utili: '',
    services_essentiels: '',
    tiers_systeme: '',
    partie_prenant_incident: '',
    maniere_partie_prenant_incident: '',
    action_cond_entre: '',
    decription_mesure_tech: '',
    incident_remonte_externe: '',
    dispositif_gestion_active: '',
    incident_connu_public: '',
    prestataire_externe_incident: '',
    denomination_sociale_prestataire: '',
    telephone_prestataire: '',
  });
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
    impact_averer: '',
    poucentage_utili: '',
    services_essentiels: '',
    tiers_systeme: '',
    partie_prenant_incident: '',
    maniere_partie_prenant_incident: '',
    action_cond_entre: '',
    decription_mesure_tech: '',
    incident_remonte_externe: '',
    incident_remonte_externe_autre: '',
    dispositif_gestion_active: '',
    incident_connu_public: '',
    prestataire_externe_incident: '',
    denomination_sociale_prestataire: '',
    telephone_prestataire: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (
    name:
      | 'impact_averer'
      | 'action_cond_entre'
      | 'moyens_inden_supp'
      | 'objectif_attaquant'
      | 'action_realise'
      | 'indentification_activ_affect'
      | 'indentification_serv_affect'
      | 'incident_remonte_externe',
    value: string
  ) => {

    const current = formData[name] || ""; // existing string
    const parts = current.split(" ").filter(v => v.trim() !== ""); // turn into array

    let updated = "";

    if (parts.includes(value)) {
      // remove value
      updated = parts.filter(item => item !== value).join(" ");
    } else {
      // add value
      updated = [...parts, value].join(" ");
    }

    setFormData({ ...formData, [name]: updated });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.denomination_org) {
      setErrors({ ...errors, denomination_org: 'La dénomination de l\'organisation est requise.' });
      setIsSubmitting(false);
      alert('Erreur lors de la soumission. Veuillez réessayer.');
      return;
    }
    if (!formData.adresse) {
      setErrors({ ...errors, adresse: 'L\'adresse est requise.' });
      setIsSubmitting(false);
      alert('Erreur lors de la soumission. Veuillez réessayer.');
      return;
    }

    const base = import.meta.env.VITE_SUPABASE_URL;
    const response = await fetch(`${base}/alertes/incidents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setIsSubmitting(false);

    if (response.ok) {
      setIsSubmitted(true);
      setCurrentStep(1);
    } else {
      alert('Erreur lors de la soumission. Veuillez réessayer.');
    }
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
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
                impact_averer: '',
                poucentage_utili: '',
                services_essentiels: '',
                tiers_systeme: '',
                partie_prenant_incident: '',
                maniere_partie_prenant_incident: '',
                action_cond_entre: '',
                decription_mesure_tech: '',
                incident_remonte_externe: '',
                dispositif_gestion_active: '',
                incident_connu_public: '',
                prestataire_externe_incident: '',
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
    'Impact',
    'Actions',
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${index + 1 === currentStep
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
                    className={`flex-1 h-1 mx-2 ${index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-300'
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
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Informations sur l'organisation et le declarant</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dénomination de l'organisation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="denomination_org"
                      value={formData.denomination_org}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Nom de votre organisation"
                      required
                      maxLength={510}
                    />
                    {errors.denomination_org && (
                      <p className="text-red-600 text-sm mt-1">{errors.denomination_org}</p>
                    )}
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
                      placeholder="Etatique..."
                      maxLength={255}
                    />
                    {errors.type_org && (
                      <p className="text-red-600 text-sm mt-1">{errors.type_org}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fournisseur (s) du système
                    </label>
                    <input
                      type="text"
                      name="fournisseur"
                      value={formData.fournisseur}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Nom du fournisseur si applicable"
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parties prenantes connues associées à l’exploitation du système
                    </label>
                    <input
                      type="text"
                      name="partie_prenan"
                      value={formData.partie_prenan}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Parties prenantes concernées"
                      maxLength={255}
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
                      maxLength={255}
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
                      maxLength={255}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Adresse complète"
                    required

                  />
                  {errors.adresse && (
                    <p className="text-red-600 text-sm mt-1">{errors.adresse}</p>
                  )}
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
                      Date de l'incident <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_incident"
                      value={formData.date_incident}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ex: 15 janvier 2025 à 14h30"
                    />
                    {errors.date_incident && (
                      <p className="text-red-600 text-sm mt-1">{errors.date_incident}</p>
                    )}
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
                      placeholder="Ex: 2 heures, 3 jours ..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident découvert par 
                  </label>
                  <select
                    name="incident_decouve"
                    value={formData.incident_decouve}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Interne">Interne</option>
                    <option value="Utilisateur">Utilisateur</option>
                    <option value="Prestataire externe">Prestataire externe</option>
                    <option value="Autre">Autre. A preciser</option>
                  </select>
                </div>
                {formData.incident_decouve === "Autre" && (<div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qui a decouvert l'incident:
                  </label>
                  <input
                    type="text"
                    name="duree_inci_clos"
                    value={formData.duree_inci_clos}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ex: technicien, auditeur ..."
                  />

                </div>)}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origine de l’incident <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="incident_decouve"
                    value={formData.origine_incident}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Négligence">Négligence</option>
                    <option value="Dysfonctionnement opérationnel">Dysfonctionnement opérationnel</option>
                    <option value="Prestataire externe">Malveillance interne</option>
                    <option value="Malveillance externe">Malveillance externe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Moyens, identifiés ou supposés, mis en œuvre par l’attaquant pour s’introduire dans le système d’information ou perturber son fonctionnement
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Dégat des eaux', 'Hameçonnage', 'Exploitation de sites Internet, d\’applications accessibles par Internet ou de services d\’accès à distance (vulnérabilité ou accès légitime)', 'Rebond depuis un tiers, un logiciel ou un service de confiance', 'Accès physique', 'Saturation', 'Rançongiciel', 'APT', 'Autre'].map((moyen) => (
                      <label key={moyen} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.moyens_inden_supp?.includes(moyen) || false}
                          onChange={() => handleCheckbox('moyens_inden_supp', moyen)}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{moyen}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.moyens_inden_supp?.includes('Autre') && (<div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quel autre moyen:
                  </label>
                  <input
                    type="text"
                    name="moyens_inden_supp_autre"
                    value={formData.moyens_inden_supp_autre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ex: manipulation ..."
                  />

                </div>)}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description des moyens mis en œuvre par l’attaquant (Si un prestataire externe est à l’origine de l’incident, merci d’indiquer ses coordonnées)
                  </label>
                  <textarea
                    name="description_moyens"
                    value={formData.description_moyens}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Détaillez les moyens utilisés..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Objectif(s) atteints par l’attaquant
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Intrusion dans le système d\’information', 'Maintien dans le système d’information', 'Progression dans le système d’information', 'Autre'].map((objectif) => (
                      <label key={objectif} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.objectif_attaquant?.includes(objectif) || false}
                          onChange={() => handleCheckbox('objectif_attaquant', objectif)}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{objectif}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.objectif_attaquant?.includes('Autre') && (<div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quel autre(s) objectif(s)
                  </label>
                  <input
                    type="text"
                    name="objectif_attaquant_autre"
                    value={formData.objectif_attaquant_autre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ex: destabilisation ..."
                  />

                </div>)}



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Actions réalisées par l’attaquant
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Déni de service (DoS ou DDoS)', 'Fuite/Exfiltration de données ', 'Chiffrement de données (rançongiciel)', 'Crypto-jacking', 'Effacement des données (wiper)', 'Défiguration (defacement)', 'Autre'].map((action) => (
                      <label key={action} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.action_realise?.includes(action) || false}
                          onChange={() => handleCheckbox('action_realise', action)}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.action_realise?.includes('Autre') && (<div>
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
                </div>)}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description générale de l’incident  <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="desc_gene_icident"
                    value={formData.desc_gene_icident}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Exemples : périmètre du système d’information affecté par l’incident, origine et déroulé de l’incident, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actions immédiates prises <span className="text-red-500">*</span>
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


            {/* Step 4: Impact */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Impact de l'incident</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Identification des activités affectées par l’incident
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Gestion de la relation client/adhérent',
                      'Gestion de portefeuille/gestion d’actifs',
                      'Négociations et ventes',
                      'Paiements',
                      'Règlement-livraisons',
                      'Souscription',
                      'Indemnisation des sinistres',
                      'Autre',
                    ].map((activite) => (
                      <label key={activite} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.indentification_activ_affect?.includes(activite) || false}
                          onChange={() => handleCheckbox('indentification_activ_affect', activite)}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{activite}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Champ "Autre" si coché */}
                {formData.indentification_activ_affect?.includes('Autre') && (
                  <div className="mt-3">
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
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Identification des services et composants affectés par l’incident
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Applications spécifiques au secteur de l’entité',
                      'Bases de données',
                      'Systèmes comptables',
                      'Progiciels',
                      'Tout équipement matériel',
                      'Réseaux et télécommunications',
                      'Sites internet',
                      'Autre',
                    ].map((service) => (
                      <label key={service} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.indentification_serv_affect?.includes(service) || false}
                          onChange={() => handleCheckbox('indentification_serv_affect', service)}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Champ "Autre" si coché */}
                {formData.indentification_serv_affect?.includes('Autre') && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Précisions complémentaires :
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
                )}


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Impacts avérés ou potentiels de l’incident
                  </label>

                  {/* === Impacts sur les données === */}
                  <p className="font-medium text-gray-600 mb-2">Impacts sur les données :</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {['Confidentialité', 'Intégrité', 'Disponibilité'].map((impact) => (
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

                  {/* === Impacts pour l’entreprise === */}
                  <p className="font-medium text-gray-600 mb-2">Impacts pour l’entreprise :</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {[
                      "Impact sur la réputation de l’entreprise",
                      "Impact financier",
                      "Impact juridique (légal, réglementaire, contractuel)",
                    ].map((impact) => (
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

                  {/* === Impacts opérationnels === */}
                  <p className="font-medium text-gray-600 mb-2">Impacts opérationnels :</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Pas d’impact",
                      "Impact minimal sur les services",
                      "Impact modéré sur les services",
                      "Impact significatif sur les services",
                    ].map((impact) => (
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
                      % d’utilisateurs internes touchés
                    </label>
                    <select
                      name="poucentage_utili"
                      value={formData.poucentage_utili}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="0 – 30 %">0 – 30 %</option>
                      <option value="30 – 60 %">30 – 60 %</option>
                      <option value="60 – 100 % ">60 – 100 % </option>
                    </select>
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
                    Si ces systèmes d’information sont
                    1) hébergés par un ou des tiers,
                    2) exploités par un ou des tiers
                    Merci d’indiquer les noms de ces tiers :
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
                      À votre connaissance, est-ce que des parties prenantes externes ont été affectées par l’incident ?
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
                      Si oui, précisez la manière dont elles l’ont été.
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

            {/* Step 5: Actions */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Traitement de l’incident</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Actions conduites par l’entreprise
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Identification', 'Analyse', 'Contingentement/Endiguement', 'Arrêt de la fonctionnalité atteinte', 'Fonctionnement en mode dégradé', 'Rétablissement'].map((action) => (
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

                <div className="space-y-2">
                  <p className="font-medium text-gray-600 mb-2">L’incident a-t-il fait l’objet d’une remontée d’information en interne ?</p>

                  {[
                    'Au responsable de la sécurité des systèmes d’information (RSSI)',
                    'Au directeur des systèmes d’information/des opérations',
                    'Au Comité de direction',
                    'À la Direction générale',
                    'À l’organe de surveillance (ex : Conseil d’administration)',
                    'Autre',
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.incident_remonte_externe?.includes(option) || false}
                        onChange={() => handleCheckbox('incident_remonte_externe', option)}
                        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}

                  {/* Si "Autre" est cochée */}
                  {formData.incident_remonte_externe?.includes('Autre') && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Autre, précisez :
                      </label>
                      <input
                        type="text"
                        name="incident_remonte_autre"
                        value={formData.incident_remonte_externe_autre || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Précisez ici"
                      />
                    </div>
                  )}
                </div>

                {/* === Un dispositif de gestion de crise a-t-il été activé ? === */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Un dispositif de gestion de crise a-t-il été activé ?
                  </label>
                  <div className="flex items-center space-x-6">
                    {['Oui', 'Non'].map((rep) => (
                      <label key={rep} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="dispositif_gestion_active"
                          value={rep}
                          checked={formData.dispositif_gestion_active === rep}
                          onChange={handleChange}
                          className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span>{rep}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* === À votre connaissance, l’incident est-il connu du public ? === */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    À votre connaissance, l’incident est-il connu du public ?
                  </label>
                  <div className="flex items-center space-x-6">
                    {['Oui', 'Non'].map((rep) => (
                      <label key={rep} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="incident_connu_public"
                          value={rep}
                          checked={formData.incident_connu_public === rep}
                          onChange={handleChange}
                          className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span>{rep}</span>
                      </label>
                    ))}
                  </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Un prestataire de réponse aux incidents a-t-il été engagé par lorganisme pour gérer l’incident ?
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
                        Numéro de téléphone du prestataire
                      </label>
                      <input
                        type="tel"
                        name="telephone_prestataire"
                        value={formData.telephone_prestataire}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="+226 12 34 56 78"
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
              {currentStep < 5 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  <span>Suivant</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
              {currentStep === 5 && (
                (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Soumettre l\'incident'}
                  </button>
                )
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
