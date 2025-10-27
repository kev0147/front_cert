import { useEffect, useState } from 'react';
import { Alerte, TypeAlerte } from '../lib/supabase';
import { ArrowLeft, Download, Calendar, AlertTriangle, FileText, Shield } from 'lucide-react';

type AlerteDetailProps = {
    id: number;
    onNavigate: (page: string) => void;
};

export default function AlerteDetail({ id, onNavigate }: AlerteDetailProps) {
    const [alerte, setAlerte] = useState<Alerte | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlerte();
    }, [id]);

    // ===== Fetch single alerte with all details =====
    const fetchAlerte = async () => {
        try {
            const base = import.meta.env.VITE_SUPABASE_URL;
            const res = await fetch(`${base}/alertes/${id}`);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} - Failed to fetch alerte`);
            }

            const response = await res.json();
            const a = response.data || response;

            const type: TypeAlerte | null = {
                id: response.type_alerte.id,
                libelle: response.type_alerte.libelle,
                description: response.type_alerte.description,
                created_by: null,
                updated_by: null,
                deleted_by: null,
                created_at: '',
                updated_at: '',
                deleted_at: null
            };

            const alerte: Alerte = {
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
                type_alerte: type,
                type_alerte_id: null,
                date_initial: null,
                date_traite: null,
                concerne: null,
                file_url: null,
                created_by: null,
                updated_by: null,
                deleted_by: null,
                deleted_at: null
            };
            setAlerte(alerte);
            setLoading(false);
        } catch (err) {
            console.error('❌ Failed to fetch alerte:', err);
            throw err;
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
            return (
                <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    ● Actif
                </span>
            );
        }
        if (etatLower.includes('cours') || etatLower.includes('progress') || etatLower.includes('traitement')) {
            return (
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    ● En cours de traitement
                </span>
            );
        }
        if (etatLower.includes('résolu') || etatLower.includes('resolu') || etatLower.includes('resolved')) {
            return (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    ● Résolu
                </span>
            );
        }
        return (
            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                ● {etat}
            </span>
        );
    };

    // ===== Handle download =====
    const handleDownload = () => {
        if (!alerte?.file_url) {
            alert('Aucun fichier disponible pour cette alerte');
            return;
        }

        try {
            // In a real implementation, this would call your backend API
            // Example: GET /alertes/:id/download
            window.open(alerte.file_url, '_blank');
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            alert('Erreur lors du téléchargement du fichier');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement de l'alerte...</p>
                </div>
            </div>
        );
    }

    if (!alerte) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-4">Alerte non trouvée</p>
                    <button
                        onClick={() => onNavigate('alertes')}
                        className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
                    >
                        Retour aux alertes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* ===== HEADER WITH BACK BUTTON ===== */}
            <div className="bg-slate-900 text-white py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/*                     <button
                        onClick={() => onNavigate('alertes')}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Retour aux alertes</span>
                    </button> */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{alerte.intitule}</h1>
                        </div>
                        {/* ===== DOWNLOAD BUTTON IN HEADER ===== */}
                        {alerte.file_url && (
                            <button
                                onClick={handleDownload}
                                className="flex items-center space-x-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                <Download className="h-5 w-5" />
                                <span>Télécharger le document</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* ===== KEY INFORMATION SECTION ===== */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Informations generale</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ===== Type d'alerte ===== */}
                        {alerte.type_alerte && (
                            <div className="flex items-start space-x-3">
                                <Shield className="h-6 w-6 text-cyan-600 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Type d'alerte</p>
                                    <p className="text-lg font-semibold text-slate-800">{alerte.type_alerte.libelle}</p>
                                </div>
                            </div>
                        )}

                        {/* ===== Sévérité ===== */}
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Sévérité</p>
                                <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-semibold mt-1 ${getSeveriteColor(alerte.severite)}`}>
                                    {alerte.severite?.toUpperCase() || 'N/A'}
                                </div>
                            </div>
                        </div>

                        {/* ===== État ===== */}
                        <div className="flex items-start space-x-3">
                            <FileText className="h-6 w-6 text-slate-600 mt-1" />
                            <div>
                                <p className="text-sm text-gray-600 font-medium">État</p>
                                <div className="mt-1">{getEtatBadge(alerte.etat)}</div>
                            </div>
                        </div>

                        {/* ===== Date initiale ===== */}
                        {alerte.date_initial && (
                            <div className="flex items-start space-x-3">
                                <Calendar className="h-6 w-6 text-slate-600 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Date de découverte</p>
                                    <p className="text-lg text-slate-800">
                                        {new Date(alerte.date_initial).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ===== Date de traitement ===== */}
                        {alerte.date_traite && (
                            <div className="flex items-start space-x-3">
                                <Calendar className="h-6 w-6 text-green-600 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Date de résolution</p>
                                    <p className="text-lg text-slate-800">
                                        {new Date(alerte.date_traite).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ===== Concerné ===== */}
                        {alerte.concerne && (
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-600 font-medium mb-2">Entités concernées</p>
                                <p className="text-slate-800">{alerte.concerne}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== RISQUE SECTION (CKEditor content) ===== */}
                {alerte.risque && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-red-500">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                            <span>Risques</span>
                        </h2>
                        <div
                            className="prose prose-slate max-w-none ckeditor-content"
                            dangerouslySetInnerHTML={{ __html: alerte.risque }}
                        />
                    </div>
                )}

                {/* ===== SYSTEMES AFFECTES SECTION (CKEditor content) ===== */}
                {alerte.systemes_affectes && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Systèmes Affectés</h2>
                        <div
                            className="prose prose-slate max-w-none ckeditor-content"
                            dangerouslySetInnerHTML={{ __html: alerte.systemes_affectes }}
                        />
                    </div>
                )}

                {/* ===== SYNTHESE SECTION (CKEditor content) ===== */}
                {alerte.synthese && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Synthèse</h2>
                        <div
                            className="prose prose-slate max-w-none ckeditor-content"
                            dangerouslySetInnerHTML={{ __html: alerte.synthese }}
                        />
                    </div>
                )}

                {/* ===== SOLUTION SECTION (CKEditor content) ===== */}
                {alerte.solution && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-green-500">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                            <Shield className="h-6 w-6 text-green-600" />
                            <span>Solution et Recommandations</span>
                        </h2>
                        <div
                            className="prose prose-slate max-w-none ckeditor-content"
                            dangerouslySetInnerHTML={{ __html: alerte.solution }}
                        />
                    </div>
                )}

                {/* ===== SOURCE SECTION ===== */}
                {alerte.source && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Sources</h2>
                        <p className="text-slate-700">{alerte.source}</p>
                    </div>
                )}

                {/* ===== METADATA SECTION ===== */}
                <div className="bg-slate-100 rounded-lg p-6">
                    <p className="text-sm text-gray-600">
                        Publié le{' '}
                        {new Date(alerte.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    {alerte.updated_at !== alerte.created_at && (
                        <p className="text-sm text-gray-600 mt-1">
                            Dernière mise à jour le{' '}
                            {new Date(alerte.updated_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    )}
                </div>

                {/* ===== BACK BUTTON AT BOTTOM ===== */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => onNavigate('alertes')}
                        className="flex items-center space-x-2 px-8 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Retour aux alertes</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
