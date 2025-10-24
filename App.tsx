import React, { useState, useEffect } from 'react';
import { useMockData } from './hooks/useMockData';
import { useFirebaseData } from './hooks/useFirebaseData';
import { isConfigured } from './firebase/firebase';
import PublicView from './pages/PublicView';
import AdminView from './pages/AdminView';
import AboutView from './pages/AboutView';
import ContactView from './pages/ContactView';
import Header from './components/Header';

export type View = 'public' | 'admin' | 'about' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<View>('public');
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
  const data = isConfigured ? useFirebaseData() : useMockData();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (data.loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
               <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-primary-DEFAULT"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-primary-DEFAULT delay-75"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-primary-DEFAULT delay-150"></div>
                    <span className="ml-2">Loading Data...</span>
                </div>
          </div>
      );
  }

  const renderView = () => {
    switch(view) {
      case 'public':
        return <PublicView clinics={data.clinics} doctors={data.doctors} />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminView {...data} />;
      default:
        return <PublicView clinics={data.clinics} doctors={data.doctors} />;
    }
  }

  return (
    <div className="min-h-screen font-sans text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300 flex flex-col">
      <Header
        currentView={view}
        onNavigate={setView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="p-4 md:p-8 flex-grow">
        {renderView()}
      </main>
      <footer className="bg-surface-light dark:bg-surface-dark mt-auto py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-secondary dark:text-gray-400">
            <div className="flex justify-center space-x-4 mb-2">
                <button onClick={() => setView('public')} className="text-sm hover:underline">Home</button>
                <button onClick={() => setView('about')} className="text-sm hover:underline">About Us</button>
                <button onClick={() => setView('contact')} className="text-sm hover:underline">Contact Us</button>
            </div>
            <p>&copy; {new Date().getFullYear()} ClinicSys. All rights reserved.</p>
            <button
              onClick={() => setView('admin')}
              className="mt-2 text-sm text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-light underline"
            >
              Admin Panel
            </button>
          </div>
      </footer>
    </div>
  );
};

export default App;