import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { motion } from 'framer-motion';

interface HeaderProps {
  isAuthenticated: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

// Icon for Sun (Light Mode)
const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

// Icon for Moon (Dark Mode)
const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


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
    // Initialize darkMode state based on localStorage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        // Check for stored theme preference first
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme === 'dark';
        }
        // Fallback to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Effect to apply the theme class to the document root element
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(prev => !prev);

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
                                    className="px-4 py-1.5 text-sm font-semibold text-white bg-primary rounded-lg shadow hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </button>
                            </>
                        )}
                        {/* Theme Toggle Button */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 ml-4 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-primary transition-colors"
                            whileTap={{ scale: 0.8 }}
                            aria-label="Toggle theme"
                        >
                            {darkMode ? (
                                <SunIcon className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <MoonIcon className="w-5 h-5 text-gray-900" />
                            )}
                        </motion.button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
