import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Wifi, 
  Moon, 
  Sun,
  ChevronRight,
  LogOut,
  HelpCircle,
  Info,
  Download,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../context/AuthContext';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  chatNotifications: boolean;
  quietHours: boolean;
  quietStart: string;
  quietEnd: string;
}

interface SyncSettings {
  autoSync: boolean;
  syncInterval: number;
  wifiOnly: boolean;
  backgroundSync: boolean;
}

interface StorageInfo {
  used: number;
  total: number;
  emails: number;
  attachments: number;
  cache: number;
}

const MOCK_STORAGE: StorageInfo = {
  used: 2.4,
  total: 5.0,
  emails: 1.2,
  attachments: 0.8,
  cache: 0.4
};

export const MobileSettings: React.FC = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    chatNotifications: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '07:00'
  });
  const [sync, setSync] = useState<SyncSettings>({
    autoSync: true,
    syncInterval: 15,
    wifiOnly: false,
    backgroundSync: true
  });
  const [storage, setStorage] = useState<StorageInfo>(MOCK_STORAGE);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Load settings from storage
    loadSettings();
    
    // Monitor network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadSettings = async () => {
    try {
      // In a real app, this would load from local storage or API
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedDarkMode);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    saveSettings('darkMode', enabled);
    // Apply theme changes
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean | string) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    saveSettings('notifications', updated);
  };

  const handleSyncChange = (key: keyof SyncSettings, value: boolean | number) => {
    const updated = { ...sync, [key]: value };
    setSync(updated);
    saveSettings('sync', updated);
  };

  const clearCache = async () => {
    try {
      // Simulate cache clearing
      setStorage(prev => ({ ...prev, cache: 0, used: prev.used - prev.cache }));
      // In a real app, this would clear actual cache
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  const exportData = async () => {
    try {
      // Simulate data export
      const data = {
        user: user,
        settings: { notifications, sync, darkMode },
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'redwoods-mailer-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const storagePercentage = Math.round((storage.used / storage.total) * 100);

  const SettingItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    onClick?: () => void;
  }> = ({ icon, title, description, action, onClick }) => (
    <div 
      className={`flex items-center justify-between p-3 ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
      {action || (onClick && <ChevronRight className="w-4 h-4 text-gray-400" />)}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Profile Section */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user?.name || 'User Name'}
                </h3>
                <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {user?.userType || 'Personal'} Account
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Network Status */}
        <Card className="bg-white">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isOnline ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Wifi className={`w-4 h-4 ${isOnline ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Network Status</p>
                  <p className="text-xs text-gray-500">
                    {isOnline ? 'Connected' : 'Offline'}
                  </p>
                </div>
              </div>
              <Badge variant={isOnline ? 'default' : 'destructive'}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <SettingItem
              icon={darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              title="Dark Mode"
              description="Switch between light and dark themes"
              action={
                <Switch
                  checked={darkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              }
            />
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            <SettingItem
              icon={<Bell className="w-4 h-4" />}
              title="Email Notifications"
              description="Get notified about new emails"
              action={
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              }
            />
            <SettingItem
              icon={<Bell className="w-4 h-4" />}
              title="Push Notifications"
              description="Receive push notifications"
              action={
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                />
              }
            />
            <SettingItem
              icon={<Bell className="w-4 h-4" />}
              title="Chat Notifications"
              description="Get notified about team messages"
              action={
                <Switch
                  checked={notifications.chatNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('chatNotifications', checked)}
                />
              }
            />
            <SettingItem
              icon={<Moon className="w-4 h-4" />}
              title="Quiet Hours"
              description="Disable notifications during set hours"
              action={
                <Switch
                  checked={notifications.quietHours}
                  onCheckedChange={(checked) => handleNotificationChange('quietHours', checked)}
                />
              }
            />
          </CardContent>
        </Card>

        {/* Sync Settings */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sync & Storage</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            <SettingItem
              icon={<RefreshCw className="w-4 h-4" />}
              title="Auto Sync"
              description="Automatically sync data"
              action={
                <Switch
                  checked={sync.autoSync}
                  onCheckedChange={(checked) => handleSyncChange('autoSync', checked)}
                />
              }
            />
            <SettingItem
              icon={<Wifi className="w-4 h-4" />}
              title="WiFi Only Sync"
              description="Only sync when connected to WiFi"
              action={
                <Switch
                  checked={sync.wifiOnly}
                  onCheckedChange={(checked) => handleSyncChange('wifiOnly', checked)}
                />
              }
            />
            <SettingItem
              icon={<Database className="w-4 h-4" />}
              title="Background Sync"
              description="Sync data in the background"
              action={
                <Switch
                  checked={sync.backgroundSync}
                  onCheckedChange={(checked) => handleSyncChange('backgroundSync', checked)}
                />
              }
            />
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Used: {storage.used} GB</span>
                  <span className="text-gray-600">Total: {storage.total} GB</span>
                </div>
                <Progress value={storagePercentage} className="h-2" />
                <p className="text-xs text-gray-500 text-center mt-1">
                  {storagePercentage}% used
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Emails</span>
                  <span className="font-medium">{storage.emails} GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Attachments</span>
                  <span className="font-medium">{storage.attachments} GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Cache</span>
                  <span className="font-medium">{storage.cache} GB</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCache}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            <SettingItem
              icon={<Shield className="w-4 h-4" />}
              title="Change Password"
              description="Update your account password"
              onClick={() => {}}
            />
            <SettingItem
              icon={<Download className="w-4 h-4" />}
              title="Export Data"
              description="Download your data"
              onClick={exportData}
            />
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Support</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            <SettingItem
              icon={<HelpCircle className="w-4 h-4" />}
              title="Help & Support"
              description="Get help and contact support"
              onClick={() => {}}
            />
            <SettingItem
              icon={<Info className="w-4 h-4" />}
              title="About"
              description="App version and information"
              onClick={() => {}}
            />
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="bg-white">
          <CardContent className="p-3">
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-500">
            Redwoods Mailer v1.0.0
          </p>
          <p className="text-xs text-gray-400 mt-1">
            © 2025 Redwoods Mailer. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileSettings;

