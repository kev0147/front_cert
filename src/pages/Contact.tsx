import { Mail, Phone, Globe, Home } from 'lucide-react';

type ContactProps = {
  onNavigate: (page: string) => void;
};

export default function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-[#12284D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-gray-300">

          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-[#12284D] to-blue-700 p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-cyan-100 mb-8">
                Notre équipe d'experts en cybersécurité est disponible pour répondre à toutes vos questions et vous accompagner dans la protection de vos systèmes.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-cyan-100">infos@ssi.gov.bf</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <p className="text-cyan-100">+226 25 36 32 33</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Home className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Localisation</h3>

                    <a
                      href="https://maps.app.goo.gl/Lh8SJ8yT11jydJix5?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-100"
                    >
                      Rue Zangoeg-Pelgo, Zogona, Ouagadougou
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Site Web</h3>
                    <a
                      href="https://anssi.bf/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-100 hover:text-white transition-colors underline"
                    >
                      anssi.bf
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Horaires d'ouverture</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-slate-700">Lundi - Vendredi</span>
                  <span className="text-gray-600">7h30 - 16h00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-slate-700">Samedi - Dimanche</span>
                  <span className="text-gray-600">Fermé</span>
                </div>
              </div>

              <div className="bg-blue-700 rounded-lg p-6 border border-cyan-200">
                <h4 className="font-semibold text-white mb-2">Urgence 24/7</h4>
                <p className="text-sm text-white mb-3">
                  Pour les incidents critiques nécessitant une intervention immédiate ecrivez-nous au :
                </p>

                <a
                  href="cirt@ssi.gov.bf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-white"
                >
                  cirt@ssi.gov.bf
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Besoin de déclarer un incident de sécurité ?
          </p>
          <button
            onClick={() => onNavigate('incident')}
            className="px-8 py-3 bg-[#D05224] text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
            Déclarer un incident
          </button>
        </div>
      </div>
    </div>
  );
}
