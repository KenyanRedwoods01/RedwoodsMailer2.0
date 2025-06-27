import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthForm } from '../features/auth/AuthForm';
import MobileAppShell from './MobileAppShell';
import MobileOfflineManager from './MobileOfflineManager';

interface AppState {
  isLoading: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
  updateProgress: number;
}

export const MobileApp: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [appState, setAppState] = useState<AppState>({
    isLoading: true,
    isOnline: navigator.onLine,
    hasUpdate: false,
    updateProgress: 0
  });

  useEffect(() => {
    // Initialize app
    initializeApp();
    
    // Set up network listeners
    const handleOnline = () => setAppState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setAppState(prev => ({ ...prev, isOnline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check for app updates
    checkForUpdates();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const initializeApp = async () => {
    try {
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Initialize offline manager
      // await OfflineManager.initialize();
      
      setAppState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Failed to initialize app:', error);
      setAppState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const checkForUpdates = async () => {
    try {
      // In a real app, this would check for updates
      // const hasUpdate = await UpdateManager.checkForUpdates();
      // setAppState(prev => ({ ...prev, hasUpdate }));
    } catch (error) {
      console.error('Failed to check for updates:', error);
    }
  };

  const handleUpdateApp = async () => {
    try {
      setAppState(prev => ({ ...prev, updateProgress: 0 }));
      
      // Simulate update progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setAppState(prev => ({ ...prev, updateProgress: i }));
      }
      
      // Reload app after update
      window.location.reload();
    } catch (error) {
      console.error('Failed to update app:', error);
    }
  };

  // Show loading screen during app initialization
  if (appState.isLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Redwoods Mailer</h1>
          <p className="text-orange-100">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // Show update notification
  if (appState.hasUpdate && appState.updateProgress === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Update Available</h2>
          <p className="text-gray-600 mb-6">
            A new version of Redwoods Mailer is available with bug fixes and improvements.
          </p>
          <button
            onClick={handleUpdateApp}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Update Now
          </button>
        </div>
      </div>
    );
  }

  // Show update progress
  if (appState.updateProgress > 0 && appState.updateProgress < 100) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Updating...</h2>
          <p className="text-gray-600 mb-4">
            Please wait while we update the app.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${appState.updateProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{appState.updateProgress}% complete</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Offline Manager */}
        <MobileOfflineManager isOnline={appState.isOnline} />
        
        {/* Main App Routes */}
        <Routes>
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? <Navigate to="/app" replace /> : <AuthForm />
            } 
          />
          <Route 
            path="/app/*" 
            element={
              isAuthenticated ? <MobileAppShell /> : <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/" 
            element={
              <Navigate to={isAuthenticated ? "/app" : "/auth"} replace />
            } 
          />
        </Routes>

        {/* Offline Indicator */}
        {!appState.isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50">
            <p className="text-sm font-medium">
              You're offline. Some features may be limited.
            </p>
          </div>
        )}

        {/* Network Status Recovery */}
        {appState.isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50 animate-pulse">
            <p className="text-sm font-medium">
              Connection restored. Syncing data...
            </p>
          </div>
        )}
      </div>
    </Router>
  );
};

export default MobileApp;

