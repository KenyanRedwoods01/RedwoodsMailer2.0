import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

interface OfflineData {
  emails: number;
  messages: number;
  drafts: number;
  attachments: number;
}

interface SyncStatus {
  isSync: boolean;
  progress: number;
  totalItems: number;
  syncedItems: number;
  failedItems: number;
  lastSync: string | null;
}

interface OfflineManagerProps {
  isOnline: boolean;
}

const MOCK_OFFLINE_DATA: OfflineData = {
  emails: 45,
  messages: 23,
  drafts: 3,
  attachments: 12
};

export const MobileOfflineManager: React.FC<OfflineManagerProps> = ({ isOnline }) => {
  const [offlineData, setOfflineData] = useState<OfflineData>(MOCK_OFFLINE_DATA);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isSync: false,
    progress: 0,
    totalItems: 0,
    syncedItems: 0,
    failedItems: 0,
    lastSync: null
  });
  const [showOfflineManager, setShowOfflineManager] = useState(false);
  const [storageUsage, setStorageUsage] = useState(0);

  useEffect(() => {
    if (isOnline && hasOfflineData()) {
      startSync();
    }
  }, [isOnline]);

  useEffect(() => {
    calculateStorageUsage();
  }, [offlineData]);

  const hasOfflineData = () => {
    return offlineData.emails > 0 || offlineData.messages > 0 || offlineData.drafts > 0;
  };

  const calculateStorageUsage = () => {
    // Simulate storage calculation (in MB)
    const usage = (offlineData.emails * 0.1) + 
                  (offlineData.messages * 0.05) + 
                  (offlineData.drafts * 0.08) + 
                  (offlineData.attachments * 2.5);
    setStorageUsage(Math.round(usage * 10) / 10);
  };

  const startSync = async () => {
    if (syncStatus.isSync) return;

    const totalItems = offlineData.emails + offlineData.messages + offlineData.drafts;
    
    setSyncStatus({
      isSync: true,
      progress: 0,
      totalItems,
      syncedItems: 0,
      failedItems: 0,
      lastSync: null
    });

    try {
      // Simulate sync process
      for (let i = 0; i <= totalItems; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const progress = Math.round((i / totalItems) * 100);
        const failed = Math.random() > 0.9 ? 1 : 0; // 10% chance of failure
        
        setSyncStatus(prev => ({
          ...prev,
          progress,
          syncedItems: i - prev.failedItems,
          failedItems: prev.failedItems + failed
        }));
      }

      // Update offline data after successful sync
      setOfflineData(prev => ({
        emails: Math.max(0, prev.emails - (totalItems - syncStatus.failedItems)),
        messages: 0,
        drafts: 0,
        attachments: Math.max(0, prev.attachments - 5)
      }));

      setSyncStatus(prev => ({
        ...prev,
        isSync: false,
        lastSync: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus(prev => ({
        ...prev,
        isSync: false
      }));
    }
  };

  const clearOfflineData = async () => {
    try {
      // In a real app, this would clear offline storage
      setOfflineData({
        emails: 0,
        messages: 0,
        drafts: 0,
        attachments: 0
      });
      
      setSyncStatus(prev => ({
        ...prev,
        progress: 0,
        totalItems: 0,
        syncedItems: 0,
        failedItems: 0
      }));
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  };

  const formatLastSync = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Don't show if no offline data and online
  if (!hasOfflineData() && isOnline && !showOfflineManager) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40">
      {/* Offline Status Indicator */}
      {!isOnline && (
        <Card className="bg-red-50 border-red-200 mb-2">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <WifiOff className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">You're offline</p>
                <p className="text-xs text-red-700">
                  {hasOfflineData() ? 'Data will sync when connection is restored' : 'Limited functionality available'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOfflineManager(!showOfflineManager)}
                className="text-red-600 hover:text-red-700"
              >
                {showOfflineManager ? 'Hide' : 'Manage'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sync Status */}
      {isOnline && syncStatus.isSync && (
        <Card className="bg-blue-50 border-blue-200 mb-2">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-4 h-4 text-blue-600 animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Syncing data...</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={syncStatus.progress} className="flex-1 h-1" />
                  <span className="text-xs text-blue-700">{syncStatus.progress}%</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  {syncStatus.syncedItems}/{syncStatus.totalItems} items synced
                  {syncStatus.failedItems > 0 && `, ${syncStatus.failedItems} failed`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offline Data Manager */}
      {(showOfflineManager || (!isOnline && hasOfflineData())) && (
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Download className="w-3 h-3 text-gray-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Offline Data</h3>
              </div>
              <Badge variant="secondary" className="text-xs">
                {storageUsage} MB
              </Badge>
            </div>

            {/* Offline Data Summary */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {offlineData.emails > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Emails</span>
                  <Badge variant="outline">{offlineData.emails}</Badge>
                </div>
              )}
              {offlineData.messages > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Messages</span>
                  <Badge variant="outline">{offlineData.messages}</Badge>
                </div>
              )}
              {offlineData.drafts > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Drafts</span>
                  <Badge variant="outline">{offlineData.drafts}</Badge>
                </div>
              )}
              {offlineData.attachments > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Attachments</span>
                  <Badge variant="outline">{offlineData.attachments}</Badge>
                </div>
              )}
            </div>

            {/* Sync Status */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-red-500" />
                )}
                <span>Last sync: {formatLastSync(syncStatus.lastSync)}</span>
              </div>
              {syncStatus.failedItems > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {syncStatus.failedItems} failed
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {isOnline && hasOfflineData() && !syncStatus.isSync && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startSync}
                  className="flex-1"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Sync Now
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearOfflineData}
                className="flex-1 text-red-600 hover:text-red-700"
              >
                Clear Data
              </Button>
            </div>

            {/* Connection Status */}
            <div className="flex items-center justify-center mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-xs">
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3 text-green-500" />
                    <span className="text-green-600">Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-red-500" />
                    <span className="text-red-600">Offline</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MobileOfflineManager;

