
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Our Mission
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          AI Emergency Aid was created with a single, vital goal: to empower individuals with immediate, accessible, and reliable first-aid information during critical moments. We leverage the power of advanced AI to bridge the gap between an emergency event and the arrival of professional medical help. Our platform is designed to provide clear, step-by-step guidance that can be crucial in preventing further injury and potentially saving lives.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          By integrating location services, we also aim to connect users with the nearest emergency facilities like hospitals and pharmacies, reducing response times when every second counts.
        </p>

        <div className="mt-12 p-6 border-l-4 border-accent bg-red-50 dark:bg-red-900/20 rounded-r-lg">
          <h2 className="text-2xl font-bold text-accent mb-3">Important Disclaimer</h2>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            This application is an informational tool and is NOT a substitute for professional medical diagnosis, advice, or treatment. The guidance provided by the AI chatbot is for first-aid purposes only.
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            In the event of a medical emergency, please dial your local emergency number (e.g., 911, 112, 999) immediately. Always consult with a qualified healthcare provider for any medical concerns or before making any decisions based on information from this app.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
