import { useEffect, useState } from 'react';
import { Alerte, TypeAlerte } from '../lib/supabase';
import { Search, Download, FileText } from 'lucide-react';

type AlertesProps = {
  onNavigate: (page: string, alerteId?: number) => void;
};

export default function Alertes({ onNavigate }: AlertesProps) {
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  const [typeAlertes, setTypeAlertes] = useState<TypeAlerte[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | number>("all");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAlertes();
  }, []);

  useEffect(() => {
  }, [searchTerm, alertes]);

  // ===== Fetch all alertes with type_alerte relationship =====
  const fetchAlertes = async () => {
    try {
      const base = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(`${base}/alertes`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const response = await res.json();

      // The API may return either { data: [...] } or just [...]
      const alertesData = Array.isArray(response)
        ? response
        : response.data || [];

      const data = alertesData.map((a: any) => ({
        id: a.id,
        reference: a.reference,
        intitule: a.intitule,
        date: a.date,
        severite: a.severite,
        etat: a.etat,
        risque: a.risque,
        systemes_affectes: a.systemes_affectes,
        synthese: a.synthese,
        solution: a.solution,
        source: a.source,
        created_at: a.created_at,
        updated_at: a.updated_at,
        // include type_alerte if nested
        type_alerte: a.type_alerte
          ? {
            id: a.type_alerte.id,
            libelle: a.type_alerte.libelle,
            description: a.type_alerte.description,
          }
          : null,
      }));

      var typeAlertesTemp: TypeAlerte[] = [];

      for (const alerte of data) {
        if (alerte.type_alerte && !typeAlertesTemp.find(ta => ta.id === alerte.type_alerte!.id)) {
          typeAlertesTemp.push(alerte.type_alerte!);
        }
      }
      setTypeAlertes(typeAlertesTemp);
      setAlertes(data);
    } catch (err) {
      console.error('Failed to fetch alertes:', err);
      setAlertes([]);
    }
  };


  // ===== Get severity color =====
  const getSeveriteColor = (severite: string | null) => {
    if (!severite) return 'bg-gray-500';
    const sev = severite.toLowerCase();
    if (sev.includes('critique') || sev.includes('critical')) return 'bg-red-600';
    if (sev.includes('élevé') || sev.includes('high') || sev.includes('eleve')) return 'bg-orange-500';
    if (sev.includes('moyen') || sev.includes('medium')) return 'bg-yellow-500';
    if (sev.includes('faible') || sev.includes('low')) return 'bg-green-500';
    return 'bg-gray-500';
  };

  // ===== Get status badge =====
  const getEtatBadge = (etat: string | null) => {
    if (!etat) return null;
    const etatLower = etat.toLowerCase();
    if (etatLower.includes('actif') || etatLower.includes('active')) {
      return <span className="text-xs text-red-700 font-medium">● Actif</span>;
    }
    if (etatLower.includes('cours') || etatLower.includes('progress') || etatLower.includes('traitement')) {
      return <span className="text-xs text-yellow-700 font-medium">● En cours</span>;
    }
    if (etatLower.includes('résolu') || etatLower.includes('resolu') || etatLower.includes('resolved')) {
      return <span className="text-xs text-green-700 font-medium">● Résolu</span>;
    }
    return <span className="text-xs text-gray-700 font-medium">● {etat}</span>;
  };

  // ===== Handle download button click =====
  const handleDownload = async (alerte: Alerte, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!alerte.file_url) {
      alert('Aucun fichier disponible pour cette alerte');
      return;
    }

    try {
      // In a real implementation, this would call your backend API
      // Example: GET /alertes/:id/download
      // For now, we'll open the file URL
      window.open(alerte.file_url, '_blank');
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement du fichier');
    }
  };

  // ===== Handle alerte card click to navigate to detail page =====
  const handleAlerteClick = (alerteId: number) => {
    onNavigate('alerte-detail', alerteId);
  };

  const filteredAlertes =
    selectedType === "all"
      ? alertes
      : alertes.filter((a) => a.type_alerte?.id === selectedType);

  const types = [
    { id: "all", libelle: "Toutes" },
    ...typeAlertes.map((t) => ({ id: t.id, libelle: t.libelle })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ===== HEADER SECTION ===== */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Alertes de Sécurité</h1>
          <p className="text-xl text-gray-300">
            Restez informé des dernières menaces et vulnérabilités
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ===== SEARCH BAR ===== */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher une alerte par titre, référence ou contenu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* ===== ALERTES LIST ===== */}
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

          {/* ===== CONTENT ===== */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap gap-3 mb-8">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${selectedType === type.id
                    ? "bg-cyan-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    }`}
                >
                  {type.libelle}
                </button>
              ))}
            </div>

            {/* ALERTES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlertes.map((alerte) => (
                <div
                  key={alerte.id}
                  onClick={() => handleAlerteClick(alerte.id)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-l-4 cursor-pointer"
                  style={{ borderLeftColor: getSeveriteColor(alerte.severite).replace('bg-', '#') }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      {/* ===== Header with badges ===== */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div
                          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getSeveriteColor(
                            alerte.severite
                          )}`}
                        >
                          {alerte.severite?.toUpperCase() || 'N/A'}
                        </div>
                        {alerte.type_alerte && (
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-full">
                            {alerte.type_alerte.libelle}
                          </span>
                        )}
                        <div className="flex items-center space-x-2">
                          {getEtatBadge(alerte.etat)}
                        </div>
                      </div>

                      {/* ===== Reference ===== */}
                      {alerte.reference && (
                        <p className="text-xs text-gray-500 font-mono mb-2">Réf: {alerte.reference}</p>
                      )}

                      {/* ===== Title ===== */}
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-cyan-600 transition-colors">
                        {alerte.intitule}
                      </h3>

                      {/* ===== Preview of synthese or risque ===== */}
                      <div
                        className="text-gray-600 mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: alerte.synthese || alerte.risque || 'Aucune description disponible',
                        }}
                      />

                      {/* ===== Date ===== */}
                      <p className="text-sm text-gray-400">
                        Publié le{' '}
                        {new Date(alerte.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {/* ===== DOWNLOAD BUTTON ===== */}
                    {alerte.file_url && (
                      <button
                        onClick={(e) => handleDownload(alerte, e)}
                        className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all transform hover:scale-105 shadow-md self-start"
                        title="Télécharger le document"
                      >
                        <Download className="h-5 w-5" />
                        <span className="hidden sm:inline">Télécharger</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* EMPTY STATE */}
            {filteredAlertes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Aucune alerte trouvée</p>
              </div>
            )}
          </div>
        </div>

        {/* ===== NO RESULTS MESSAGE ===== */}
        {filteredAlertes.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Aucune alerte trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}



/* 
 */

