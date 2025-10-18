import React from 'react';
import { motion } from 'framer-motion';
import { useGeolocation } from '../hooks/useGeolocation';
import MapComponent from './MapComponent';
import { MOCK_HOSPITALS, MOCK_PHARMACIES } from '../constants';
import type { EmergencyService } from '../types';
import { HospitalIcon } from './icons/HospitalIcon';
import { MedicineIcon } from './icons/MedicineIcon';
import { AmbulanceIcon } from './icons/AmbulanceIcon';
import { PoliceIcon } from './icons/PoliceIcon';

const HomePage: React.FC = () => {
  const { latitude, longitude, error, loading } = useGeolocation();

  const renderEmergencyServices = (title: string, services: EmergencyService[], icon: React.ReactNode) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex-1 min-w-[280px]">
      <h3 className="text-lg font-bold mb-3 flex items-center">{icon}{title}</h3>
      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {services.map(service => (
          <li key={service.id} className="text-sm p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <p className="font-semibold">{service.name}</p>
            <p className="text-gray-600 dark:text-gray-400">{service.address}</p>
            <a href={`tel:${service.phone}`} className="text-primary hover:underline">{service.phone}</a>
          </li>
        ))}
      </ul>
    </div>
  );

  const EmergencyButton: React.FC<{ icon: React.ReactNode; label: string; phoneNumber: string }> = ({ icon, label, phoneNumber }) => (
    <motion.a 
      href={`tel:${phoneNumber}`}
      className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-red-500 mb-2">{icon}</div>
      <span className="font-semibold text-sm">{label}</span>
    </motion.a>
  );

  const renderEmergencyHotline = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <EmergencyButton icon={<AmbulanceIcon className="w-8 h-8" />} label="Call Ambulance" phoneNumber="911" />
        <EmergencyButton icon={<PoliceIcon className="w-8 h-8" />} label="Call Police" phoneNumber="911" />
        <EmergencyButton icon={<HospitalIcon className="w-8 h-8" />} label="Nearest Hospital" phoneNumber={MOCK_HOSPITALS[0].phone} />
        <EmergencyButton icon={<MedicineIcon className="w-8 h-8" />} label="Nearest Pharmacy" phoneNumber={MOCK_PHARMACIES[0].phone} />
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Emergency Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Quick access to emergency services and your location.</p>
        
        {renderEmergencyHotline()}

        <div className="mt-8">
          {loading && <p className="text-center py-10">Loading your location...</p>}
          {error && <p className="text-center text-red-500 py-10">Error: {error}. Displaying services for a default location.</p>}
          
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden relative">
                <MapComponent
                  center={{ lat: latitude || 34.0522, lng: longitude || -118.2437 }} // Default to LA if error
                  markers={[...MOCK_HOSPITALS, ...MOCK_PHARMACIES]}
                />
              </div>
              <div className="md:col-span-1 flex flex-col gap-6">
                {renderEmergencyServices("Nearby Hospitals", MOCK_HOSPITALS, <HospitalIcon className="w-5 h-5 mr-2" />)}
                {renderEmergencyServices("Nearby Pharmacies", MOCK_PHARMACIES, <MedicineIcon className="w-5 h-5 mr-2" />)}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;