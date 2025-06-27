import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import OrganizationDashboard from '../features/dashboard/OrganizationDashboard';
import DeveloperDashboard from '../features/dashboard/DeveloperDashboard';
import FreelancerDashboard from '../features/dashboard/FreelancerDashboard';
import NGODashboard from '../features/dashboard/NGODashboard';
import GovernmentDashboard from '../features/dashboard/GovernmentDashboard';
import InstitutionDashboard from '../features/dashboard/InstitutionDashboard';
import ReligiousDashboard from '../features/dashboard/ReligiousDashboard';
import HealthcareDashboard from '../features/dashboard/HealthcareDashboard';
import StartupDashboard from '../features/dashboard/StartupDashboard';
import InboxPanel from '../features/email/InboxPanel';
import ComposeEmail from '../features/email/ComposeEmail';
import EmailViewer from '../features/email/EmailViewer';
import UserSettings from '../features/profile/UserSettings';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('/dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data for development
  const mockUser = {
    id: 'user_123',
    email: 'user@example.com',
    name: 'John Doe',
    avatar_url: '',
    user_metadata: {
      name: 'John Doe',
      userType: 'Organization'
    }
  };

  const currentUser = user || mockUser;

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (path: string) => {
    setCurrentView(path);
    setSidebarOpen(false);
  };

  const renderDashboardContent = () => {
    const userType = currentUser?.user_metadata?.userType || 'Organization';
    
    switch (userType) {
      case 'Developer':
        return <DeveloperDashboard />;
      case 'Freelancer':
        return <FreelancerDashboard />;
      case 'NGO':
        return <NGODashboard />;
      case 'Government':
        return <GovernmentDashboard />;
      case 'Institution':
        return <InstitutionDashboard />;
      case 'Religious':
        return <ReligiousDashboard />;
      case 'Healthcare':
        return <HealthcareDashboard />;
      case 'Startup':
        return <StartupDashboard />;
      default:
        return <OrganizationDashboard />;
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case '/dashboard':
        return renderDashboardContent();
      case '/inbox':
        return <InboxPanel />;
      case '/compose':
        return <ComposeEmail />;
      case '/email-viewer':
        return <EmailViewer />;
      case '/settings':
        return <UserSettings />;
      default:
        return (
          <Box p={8} textAlign="center">
            <Text fontSize="xl" color="gray.600">
              {currentView.replace('/', '').charAt(0).toUpperCase() + currentView.slice(2)} - Coming Soon
            </Text>
            <Text mt={4} color="gray.500">
              This feature is under development.
            </Text>
          </Box>
        );
    }
  };

  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" color="primary.500" />
      </Flex>
    );
  }

  return (
    <Flex h="100vh" bg="gray.50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <Flex direction="column" flex={1} ml={{ base: 0, lg: '280px' }}>
        {/* Header */}
        <Header onMenuClick={handleSidebarToggle} />

        {/* Content Area */}
        <Box flex={1} overflow="auto" p={6}>
          {!user && (
            <Alert status="info" mb={4} borderRadius="lg">
              <AlertIcon />
              Running in demo mode. Connect to Supabase for full functionality.
            </Alert>
          )}
          {renderCurrentView()}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;

