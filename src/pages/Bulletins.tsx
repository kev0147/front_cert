export default function Bulletins() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-slate-800">Bulletins désactivés</h1>
        <p className="text-gray-600 mt-2">La section « Bulletins » est désactivée — seules les alertes sont affichées.</p>
      </div>
    </div>
  );
}

/*
Original Bulletins.tsx implementation (commented out):

import { useEffect, useState } from 'react';
import { Bulletin } from '../lib/supabase';
import { Search, BookOpen } from 'lucide-react';

export default function Bulletins() {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [filteredBulletins, setFilteredBulletins] = useState<Bulletin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBulletins();
  }, []);

  useEffect(() => {
    const filtered = bulletins.filter(
      (bulletin) =>
        bulletin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bulletin.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bulletin.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBulletins(filtered);
    setCurrentPage(1);
  }, [searchTerm, bulletins]);

  const fetchBulletins = async () => {
    try {
      const base = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${base}/bulletins`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const response = await res.json();
      const bulletinsData = response.data || [];

      // Map Laravel fields to frontend format
      const data = bulletinsData.map((b: any) => ({
        id: String(b.id),
        title: b.titre || '',
        summary: b.resume || '',
        content: b.contenu || '',
        category: b.categorie || 'Général',
        published_at: b.date_publication || b.created_at,
        created_at: b.created_at
      }));

      setBulletins(data);
      setFilteredBulletins(data);
    } catch (err) {
      console.error('Failed to fetch bulletins:', err);
      setBulletins([]);
      setFilteredBulletins([]);
    }
  };

  const totalPages = Math.ceil(filteredBulletins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBulletins = filteredBulletins.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bulletins</h1>
          <p className="text-xl text-gray-300">
            Communications officielles et mises à jour périodiques
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un bulletin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          {currentBulletins.map((bulletin) => (
            <div
              key={bulletin.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="h-5 w-5 text-cyan-600" />
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {bulletin.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">
                    {bulletin.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{bulletin.summary}</p>
                  <p className="text-sm text-gray-400">
                    Publié le{' '}
                    {new Date(bulletin.published_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBulletins.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Aucun bulletin trouvé</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-md transition-all ${
                    currentPage === page
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
*/
