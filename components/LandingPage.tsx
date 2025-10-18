
import React from 'react';
import { Page } from '../types';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onNavigate }) => {
  return (
    <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
        >
          Swastha❤️‍🩹
          Help save lives in emergencies
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
        >
          using AI guidance.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
        >
          Get instant, step-by-step first-aid instructions, locate nearby medical services, and connect with help faster than ever before.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </button>
          <button
            onClick={() => onNavigate(Page.About)}
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300"
          >
            About
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
