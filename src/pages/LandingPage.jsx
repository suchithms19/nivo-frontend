import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-sm"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <img src={logo} alt="" className="w-10 h-10"/>
              <span className="ml-2 text-xl font-bold text-gray-900">Nivo</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Link to={'/login'} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105">
                Log In
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={'/signup'} className="bg-cuspurple text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-all duration-200">
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Transform Your</span>
                <motion.span 
                  className="block text-cuspurple"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Queue Management
                </motion.span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Convert patient wait times into a seamless experience. Boost efficiency, reduce frustration, and optimize your healthcare facility's flow.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <motion.div 
                  className="rounded-md shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={'/signup'} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cuspurple hover:bg-opacity-90 md:py-4 md:text-lg md:px-10">
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900">
                Features that set us apart
              </h2>
            </motion.div>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-cuspurple mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-gray-500">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

      
        
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-300 text-sm">
                Nivo provides comprehensive crowd management software specifically designed 
                to enhance patient flow and reduce wait times in hospitals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 text-sm flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                mssuchith@gmail.com
              </p>
            </motion.div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 Nivo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Real-Time Updates',
    description: 'Get instant notifications on queue status changes and wait times.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    title: 'Smart Predictions',
    description: 'AI-powered wait time predictions for better resource allocation.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Patient-Centric',
    description: 'Enhance patient experience with organized and efficient queuing.',
  },
];

export default LandingPage;