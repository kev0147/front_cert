import { useState } from 'react';
import logo from '../assets/c82ab65d-63cd-4f9b-8b77-1b0a70a7415f.png';
import { Menu, X } from 'lucide-react';

type NavbarProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#12284D] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32 sm:h-40">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img className="h-24 w-24 text-cyan-400 group-hover:text-cyan-300 transition-colors" src={logo} alt={logo} />
            <span className="text-xl font-bold group-hover:text-cyan-300 transition-colors">
              CIRT BF
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-6 py-2 rounded-md transition-all ${currentPage === 'home'
                ? 'bg-[#FFFFFF] text-[#12284D] font-bold'
                : 'font-bold text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
            >
              Accueil
            </button>

            <button
              onClick={() => onNavigate('alertes')}
              className={`px-4 py-2 rounded-md transition-all ${currentPage === 'alertes'
                ? 'bg-[#FFFFFF] text-[#12284D] font-bold'
                : 'font-bold text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
            >
              Publications
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`px-4 py-2 rounded-md transition-all ${currentPage === 'contact'
                ? 'bg-[#FFFFFF] text-[#12284D] font-bold'
                : 'font-bold text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
            >
              Contact
            </button>

            <button
              onClick={() => onNavigate('incident')}
              className="ml-4 px-6 py-2 bg-[#D05224] text-white rounded-md hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Déclarer un incident
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>


        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-md ${currentPage === 'home' ? 'bg-slate-800 text-cyan-400' : 'text-gray-300'
                }`}
            >
              Accueil
            </button>


            <button
              onClick={() => {
                onNavigate('alertes');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-md ${currentPage === 'alertes' ? 'bg-slate-800 text-cyan-400' : 'text-gray-300'
                }`}
            >
              Publications
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-md ${currentPage === 'contact' ? 'bg-slate-800 text-cyan-400' : 'text-gray-300'
                }`}
            >
              Contact
            </button>

            <button
              onClick={() => {
                onNavigate('incident');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Déclarer un incident
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}