import React, { useState } from 'react';
import { Page } from '../types';
import { motion } from 'framer-motion';

interface ApiKeyPageProps {
  onNavigate: (page: Page) => void;
}

const ApiKeyPage: React.FC<ApiKeyPageProps> = ({ onNavigate }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('googleMapsApiKey', apiKey.trim());
      alert('API Key saved successfully! The application will now reload.');
      window.location.reload(); 
    } else {
      alert('Please enter a valid API key.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Configure Google Maps API Key
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          To enable live map features, you need to provide a Google Maps JavaScript API key. This key is stored securely in your browser's local storage and is not sent to our servers.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Your API Key
            </label>
            <input
              id="apiKey"
              name="apiKey"
              type="text"
              placeholder="Enter your Google Maps API key here"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
           <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline block text-center"
          >
            How to get an API Key?
          </a>
        </div>
        <div className="flex items-center justify-between pt-4">
          <button
             onClick={() => onNavigate(Page.Home)}
             className="px-6 py-2 text-sm font-semibold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
           >
            Back to Home
          </button>
          <button
            onClick={handleSave}
            className="w-auto px-6 py-2 font-semibold text-white bg-primary rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Save Key & Reload
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ApiKeyPage;