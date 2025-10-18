import React from 'react';
import { Page } from '../types';

interface DemoMapProps {
  onNavigate: (page: Page) => void;
}

const DemoMap: React.FC<DemoMapProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-full w-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
      {/* Fake map background using SVG */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Fake roads */}
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="10" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.6)" strokeWidth="15" />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="rgba(255,255,255,0.5)" strokeWidth="12" />
        {/* Fake location markers */}
        <circle cx="20%" cy="30%" r="5" fill="rgba(239, 68, 68, 0.8)" />
        <circle cx="70%" cy="75%" r="5" fill="rgba(34, 197, 94, 0.8)" />
        <circle cx="40%" cy="80%" r="5" fill="rgba(239, 68, 68, 0.8)" />
        {/* User location */}
        <circle cx="50%" cy="60%" r="8" fill="#4285F4" stroke="white" strokeWidth="2" />
      </svg>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.031-1.743 3.031H4.42c-1.533 0-2.493-1.697-1.743-3.031l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-bold text-white">Interactive Map Disabled</h3>
        <p className="text-yellow-200 mt-2 max-w-sm">
          To enable live location features, please configure your Google Maps API Key.
        </p>
        <button
          onClick={() => onNavigate(Page.ApiKey)}
          className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Configure API Key
        </button>
      </div>
    </div>
  );
};

export default DemoMap;