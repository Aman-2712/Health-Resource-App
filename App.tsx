import React, { useState, useCallback } from 'react';
import { Page } from './types';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import UserProfilePage from './components/UserProfilePage';
import FirstAidPage from './components/FirstAidPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ApiKeyPage from './components/ApiKeyPage';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    return isAuthenticated ? Page.Home : Page.Landing;
  });

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setCurrentPage(Page.Home);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setCurrentPage(Page.Landing);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Landing:
        return <LandingPage onGetStarted={() => navigateTo(Page.Login)} onNavigate={navigateTo} />;
      case Page.Home:
        return <HomePage />;
      case Page.Profile:
        return <UserProfilePage onLogout={handleLogout} />;
      case Page.FirstAid:
        return <FirstAidPage />;
      case Page.About:
        return <AboutPage />;
      case Page.Login:
        return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
      case Page.SignUp:
        return <SignUpPage onSignUp={handleLogin} onNavigate={navigateTo} />;
      // FIX: Add ApiKey page to the router to handle navigation from the DemoMap component.
      case Page.ApiKey:
        return <ApiKeyPage onNavigate={navigateTo} />;
      default:
        return <LandingPage onGetStarted={() => navigateTo(Page.Login)} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-transparent to-red-50 dark:from-blue-900/30 dark:to-red-900/30 -z-10"></div>
      <Header isAuthenticated={isAuthenticated} onNavigate={navigateTo} onLogout={handleLogout} />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      {isAuthenticated && <Chatbot />}
    </div>
  );
}