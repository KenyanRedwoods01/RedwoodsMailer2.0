import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
