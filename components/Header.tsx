import React from 'react';
import { Page } from '../types';
import { motion } from 'framer-motion';

interface HeaderProps {
  isAuthenticated: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const NavButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <motion.button
        onClick={onClick}
        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.button>
);

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onNavigate, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate(isAuthenticated ? Page.Home : Page.Landing)}>
            <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}>
             <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
            </motion.div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">AI Emergency Aid</span>
          </div>
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavButton onClick={() => onNavigate(Page.Home)}>Home</NavButton>
                <NavButton onClick={() => onNavigate(Page.FirstAid)}>First-Aid Info</NavButton>
                <NavButton onClick={() => onNavigate(Page.Profile)}>Profile</NavButton>
                <NavButton onClick={onLogout}>Logout</NavButton>
              </>
            ) : (
              <>
                <NavButton onClick={() => onNavigate(Page.About)}>About</NavButton>
                <button 
                  onClick={() => onNavigate(Page.Login)}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login / Sign Up
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;