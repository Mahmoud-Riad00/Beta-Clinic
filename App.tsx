import React, { useState, useEffect } from 'react';
import { useFirebaseData } from './hooks/useFirebaseData';
import { isConfigured } from './firebase/firebase';
import PublicView from './pages/PublicView';
import AdminView from './pages/AdminView';
import Header from './components/Header';

export type View = 'public' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('public');
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
  const data = useFirebaseData();

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

  if (!isConfigured) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="max-w-2xl p-8 rounded-lg shadow-lg bg-surface-light dark:bg-surface-dark text-center">
                <h1 className="text-2xl font-bold text-primary-dark dark:text-primary-light mb-4">Firebase Not Configured</h1>
                <p className="mb-4">
                    It looks like you haven't set up your Firebase project credentials yet. Please follow these steps:
                </p>
                <ol className="text-left list-decimal list-inside space-y-2 mb-6">
                    <li>Open the file <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">firebase/config.ts</code> in your editor.</li>
                    <li>Replace the placeholder values with your actual Firebase project configuration.</li>
                    <li>You can find your config in the Firebase Console under Project Settings.</li>
                </ol>
                <p>Once you've added your credentials, the app will connect to your Firebase project automatically.</p>
            </div>
        </div>
    );
  }

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

  return (
    <div className="min-h-screen font-sans text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300 flex flex-col">
      <Header
        currentView={view}
        onNavigate={setView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="p-4 md:p-8 flex-grow">
        {view === 'public' ? (
          <PublicView clinics={data.clinics} doctors={data.doctors} />
        ) : (
          <AdminView {...data} />
        )}
      </main>
      <footer className="bg-surface-light dark:bg-surface-dark mt-auto py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-secondary dark:text-gray-400">
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