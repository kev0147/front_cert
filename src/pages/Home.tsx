import { useEffect, useState } from 'react';
import { Alerte, TypeAlerte } from '../lib/supabase';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

type HomeProps = {
  onNavigate: (page: string, alerteId?: number) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  const [typeAlertes, setTypeAlertes] = useState<TypeAlerte[]>([]);
  const [alerteScrolls, setAlerteScrolls] = useState<{ [key: number]: number }>({});


  const slides = [
    {
      title: 'Protection Avancée Contre les Cybermenaces',
      subtitle: 'Sécurisez votre infrastructure avec nos solutions de pointe',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    },
    {
      title: 'Surveillance 24/7 de Votre Sécurité',
      subtitle: 'Des alertes en temps réel pour une protection optimale',
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
    },
    {
      title: 'Conformité et Réglementation',
      subtitle: 'Respectez les normes internationales de cybersécurité',
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg',
    },
  ];

  useEffect(() => {
    fetchAlertes();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ===== UPDATED: Fetch alertes with type_alerte relationship =====
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

  const handleAlerteClick = (alerteId: number) => {
    onNavigate('alerte-detail', alerteId);
  };



  // ===== UPDATED: Get severity color based on new format =====
  const getSeveriteColor = (severite: string | null) => {
    if (!severite) return 'bg-gray-500';
    const sev = severite.toLowerCase();
    if (Number(sev) >= 8) return 'bg-red-600';
    if (Number(sev) < 8 && Number(sev) >= 6) return 'bg-orange-500';
    if (Number(sev) < 6 && Number(sev) >= 4) return 'bg-yellow-500';
    if (Number(sev) < 4) return 'bg-green-500';
    return 'bg-gray-500';
  };

  // ===== UPDATED: Get status badge based on etat field =====
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

  const scrollAlertes = (typeId: number, direction: 'left' | 'right') => {
    const currentScroll = alerteScrolls[typeId] || 0;
    const typeAlertes = alertes.filter(a => a.type_alerte?.id === typeId);
    const maxScroll = Math.max(0, typeAlertes.length - 3);

    if (direction === 'right' && currentScroll < maxScroll) {
      setAlerteScrolls({ ...alerteScrolls, [typeId]: currentScroll + 1 });
    } else if (direction === 'left' && currentScroll > 0) {
      setAlerteScrolls({ ...alerteScrolls, [typeId]: currentScroll - 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ===== CAROUSEL SECTION ===== */}
      <div className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
            </div>
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 animate-fade-in-delay">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-cyan-400 w-8' : 'bg-white/50 hover:bg-white/75'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ===== ALERTES SECTION WITH UPDATED FIELDS ===== */}
        {/*         <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Alertes Récentes</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => scrollAlertes('left')}
                disabled={alerteScroll === 0}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5 text-slate-700" />
              </button>
              <button
                onClick={() => scrollAlertes('right')}
                disabled={alerteScroll >= alertes.length - 3}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5 text-slate-700" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${alerteScroll * (100 / 3)}%)` }}
            >
              {alertes.map((alerte) => (
                <div
                  key={alerte.id}
                  onClick={() => handleAlerteClick(alerte.id)}
                  className="min-w-[calc(33.333%-16px)] bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-l-4 cursor-pointer"
                  style={{ borderLeftColor: getSeveriteColor(alerte.severite).replace('bg-', '#') }}
                >
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getSeveriteColor(alerte.severite)}`}>
                      {alerte.severite?.toUpperCase() || 'N/A'}
                    </div>
                    <div className="flex items-center space-x-1">
                      {getEtatBadge(alerte.etat)}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{alerte.intitule}</h3>
                  {alerte.type_alerte && (
                    <p className="text-xs text-cyan-600 font-medium mb-2">
                      {alerte.type_alerte.libelle}
                    </p>
                  )}
                  <div
                    className="text-sm text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: alerte.risque || alerte.synthese || 'Aucune description disponible' }}
                  />
                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(alerte.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => onNavigate('alertes')}
              className="flex items-center space-x-2 px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="font-semibold">Voir toutes les alertes</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section> */}

        {/*         {
          typeAlertes.map((type) => (
            <section key={type.id}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Actualite des {type.libelle}s</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => scrollAlertes('left')}
                    disabled={alerteScroll === 0}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => scrollAlertes('right')}
                    disabled={alerteScroll >= alertes.length - 3}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5 text-slate-700" />
                  </button>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-6"
                  style={{ transform: `translateX(-${alerteScroll * (100 / 3)}%)` }}
                >
                  {alertes
                    .filter(a => a.type_alerte?.id === type.id)
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5)
                    .map((alerte) => (
                      <div
                        key={alerte.id}
                        onClick={() => handleAlerteClick(alerte.id)}
                        className="min-w-[calc(33.333%-16px)] bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-l-4 cursor-pointer"
                        style={{ borderLeftColor: getSeveriteColor(alerte.severite).replace('bg-', '#') }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getSeveriteColor(alerte.severite)}`}>
                            {alerte.severite?.toUpperCase() || 'N/A'}
                          </div>
                          <div className="flex items-center space-x-1">
                            {getEtatBadge(alerte.etat)}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{alerte.intitule}</h3>
                        {alerte.type_alerte && (
                          <p className="text-xs text-cyan-600 font-medium mb-2">
                            {alerte.type_alerte.libelle}
                          </p>
                        )}
                        <div
                          className="text-sm text-gray-600 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: alerte.risque || alerte.synthese || 'Aucune description disponible' }}
                        />
                        <p className="text-xs text-gray-400 mt-4">
                          {new Date(alerte.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => onNavigate('alertes')}
                  className="flex items-center space-x-2 px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <span className="font-semibold">Voir toutes les alertes</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          ))
        } */}

        {typeAlertes.map((type) => {
          const typeAlertesList = alertes
            .filter(a => a.type_alerte?.id === type.id)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 5);

          if (typeAlertesList.length === 0) return null;

          const currentScroll = alerteScrolls[type.id] || 0;
          const maxScroll = Math.max(0, typeAlertesList.length - 3);

          return (
            <section key={type.id} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-800">
                  Actualité des {type.libelle}s
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => scrollAlertes(type.id, 'left')}
                    disabled={currentScroll === 0}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => scrollAlertes(type.id, 'right')}
                    disabled={currentScroll >= maxScroll}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5 text-slate-700" />
                  </button>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-6"
                  style={{ transform: `translateX(calc(-${currentScroll * 33.333}% - ${currentScroll * 16}px))` }}
                >
                  {typeAlertesList.map((alerte) => (
                    <div
                      key={alerte.id}
                      onClick={() => handleAlerteClick(alerte.id)}
                      className="min-w-[calc(33.333%-16px)] bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border-l-4 cursor-pointer"
                      style={{ borderLeftColor: getSeveriteColor(alerte.severite).replace('bg-', '#') }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getSeveriteColor(alerte.severite)}`}>
                          {alerte.severite?.toUpperCase() || 'N/A'}
                        </div>
                        <div className="flex items-center space-x-1">
                          {getEtatBadge(alerte.etat)}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{alerte.intitule}</h3>
                      {alerte.type_alerte && (
                        <p className="text-xs text-cyan-600 font-medium mb-2">
                          {alerte.type_alerte.libelle}
                        </p>
                      )}
                      <div
                        className="text-sm text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: alerte.risque || alerte.synthese || 'Aucune description disponible' }}
                      />
                      <p className="text-xs text-gray-400 mt-4">
                        {new Date(alerte.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => onNavigate('alertes')}
                  className="flex items-center space-x-2 px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <span className="font-semibold">Tout voir: {type.libelle}s</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          );
        })}

      </div>
    </div>
  );
}