
import React from 'react';
import { SunIcon, MoonIcon, HeartPulseIcon } from './icons/Icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {

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
          <div className="flex items-center">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;