import React, { useState, useEffect } from 'react';
import { Home, Mail, MessageCircle, Settings, User, Bell, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../context/AuthContext';
import MobileInbox from './MobileInbox';
import MobileTeamChat from './MobileTeamChat';
import MobileDashboard from './MobileDashboard';
import MobileSettings from './MobileSettings';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  badge?: number;
}

export const MobileAppShell: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [unreadEmails, setUnreadEmails] = useState(5);
  const [unreadMessages, setUnreadMessages] = useState(2);

  const tabs: TabItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      component: <MobileDashboard />
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: <Mail className="w-5 h-5" />,
      component: <MobileInbox />,
      badge: unreadEmails
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: <MessageCircle className="w-5 h-5" />,
      component: <MobileTeamChat />,
      badge: unreadMessages
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      component: <MobileSettings />
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update notification counts
      if (Math.random() > 0.8) {
        setNotifications(prev => prev + 1);
      }
      if (Math.random() > 0.9) {
        setUnreadEmails(prev => prev + 1);
      }
      if (Math.random() > 0.85) {
        setUnreadMessages(prev => prev + 1);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    
    // Clear badges when tab is selected
    if (tabId === 'inbox') {
      setUnreadEmails(0);
    } else if (tabId === 'chat') {
      setUnreadMessages(0);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Status Bar Simulation */}
      <div className="bg-orange-500 h-6 flex items-center justify-center">
        <div className="flex items-center justify-between w-full px-4">
          <span className="text-white text-xs font-medium">9:41 AM</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
            <div className="w-1 h-2 bg-white rounded-sm"></div>
            <span className="text-white text-xs">100%</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-orange-100 text-orange-600">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {activeTabData?.label || 'Redwoods Mailer'}
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name || 'User'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Search className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0"
                >
                  {notifications > 99 ? '99+' : notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTabData?.component}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => handleTabPress(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 relative ${
                activeTab === tab.id 
                  ? 'text-orange-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && tab.badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 text-xs min-w-[16px] h-[16px] flex items-center justify-center p-0"
                  >
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Safe Area Bottom */}
      <div className="bg-white h-2"></div>
    </div>
  );
};

export default MobileAppShell;

