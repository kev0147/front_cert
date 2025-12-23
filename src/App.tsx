  import { useState } from 'react';
  import Navbar from './components/Navbar';
  import Footer from './components/Footer';
  import Home from './pages/Home';
  import Alertes from './pages/Alertes';
  import AlerteDetail from './pages/AlerteDetail';
  import Contact from './pages/Contact';
  import IncidentForm from './pages/IncidentForm';

  function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedAlerteId, setSelectedAlerteId] = useState<number | null>(null);

    const handleNavigate = (page: string, alerteId?: number) => {
      setCurrentPage(page);
      if (alerteId !== undefined) {
        setSelectedAlerteId(alerteId);
      } else {
        setSelectedAlerteId(null);
      }
    };

    const renderPage = () => {
      switch (currentPage) {
        case 'home':
          return <Home onNavigate={handleNavigate} />;
        case 'alertes':
          return <Alertes onNavigate={handleNavigate} />;
        case 'alerte-detail':
          return selectedAlerteId ? (
            <AlerteDetail id={selectedAlerteId} onNavigate={handleNavigate} />
          ) : (
            <Alertes onNavigate={handleNavigate} />
          );
  /*       case 'rapports':
          return <Rapports />;
        case 'bulletins':
          return <Bulletins />;
        case 'documentation':
          return <Documentation />;  */
        case 'contact':
          return <Contact onNavigate={handleNavigate} />;
        case 'incident':
          return <IncidentForm />;
        default:
          return <Home onNavigate={handleNavigate} />;
      }
    };

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    );
  }

  export default App;
