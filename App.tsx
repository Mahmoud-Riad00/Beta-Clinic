
import React, { useState, useEffect } from 'react';
import { useMockData } from './hooks/useMockData';
import PublicView from './pages/PublicView';
import AdminView from './pages/AdminView';
import Header from './components/Header';

export type View = 'public' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('public');
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
  const data = useMockData();

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

  return (
    <div className="min-h-screen font-sans text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Header
        currentView={view}
        onNavigate={setView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="p-4 md:p-8">
        {view === 'public' ? (
          <PublicView clinics={data.clinics} doctors={data.doctors} />
        ) : (
          <AdminView {...data} />
        )}
      </main>
    </div>
  );
};

export default App;
