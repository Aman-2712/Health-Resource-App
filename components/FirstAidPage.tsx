
import React from 'react';
import { FIRST_AID_TOPICS } from '../constants';
import { motion } from 'framer-motion';

const FirstAidPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">First-Aid Information</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Quick-access AI-backed tips for common emergencies. This is not a substitute for professional medical advice.
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {FIRST_AID_TOPICS.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-3">{topic.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{topic.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FirstAidPage;
