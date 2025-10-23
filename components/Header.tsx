import React from 'react';
import { View } from '../App';
import { SunIcon, MoonIcon, HeartPulseIcon, HomeIcon } from './icons/Icons';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, theme, onToggleTheme }) => {
  const getNavClass = (view: View) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
      currentView === view
        ? 'bg-primary-light text-primary-dark dark:bg-sky-900 dark:text-primary-light shadow-inner'
        : 'text-gray-600 dark:text-gray-300 hover:bg-primary-light/50 hover:text-primary-dark dark:hover:bg-surface-dark/50'
    }`;

  return (
    <header className="bg-surface-light dark:bg-surface-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <HeartPulseIcon className="h-8 w-8 text-primary-dark" />
            <h1 className="ml-2 text-xl font-bold text-primary-dark dark:text-primary-light">
              ClinicSys
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <button onClick={() => onNavigate('public')} className={getNavClass('public')}>
              <HomeIcon className="h-5 w-5" />
              <span>Public View</span>
            </button>
          </nav>
          <div className="flex items-center">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="md:hidden flex justify-center space-x-4 pb-3">
             <button onClick={() => onNavigate('public')} className={getNavClass('public')}>
              <HomeIcon className="h-5 w-5" />
              <span>Public</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;