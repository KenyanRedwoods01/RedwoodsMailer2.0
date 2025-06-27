import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Calendar, 
  Clock,
  Star,
  Archive,
  Send,
  Inbox,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../context/AuthContext';

interface DashboardStats {
  totalEmails: number;
  unreadEmails: number;
  sentEmails: number;
  draftEmails: number;
  teamMessages: number;
  activeProjects: number;
  completedTasks: number;
  pendingTasks: number;
}

interface RecentActivity {
  id: string;
  type: 'email' | 'message' | 'task' | 'meeting';
  title: string;
  description: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'in-progress';
}

const MOCK_STATS: DashboardStats = {
  totalEmails: 1247,
  unreadEmails: 23,
  sentEmails: 89,
  draftEmails: 5,
  teamMessages: 156,
  activeProjects: 8,
  completedTasks: 34,
  pendingTasks: 12
};

const MOCK_ACTIVITIES: RecentActivity[] = [
  {
    id: '1',
    type: 'email',
    title: 'New email from Sarah Johnson',
    description: 'Project update and next steps',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '2',
    type: 'message',
    title: 'Team chat message',
    description: 'Design review meeting scheduled',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    priority: 'medium',
    status: 'completed'
  },
  {
    id: '3',
    type: 'task',
    title: 'Complete quarterly report',
    description: 'Due by end of week',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: '4',
    type: 'meeting',
    title: 'Client presentation',
    description: 'Tomorrow at 2:00 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '5',
    type: 'email',
    title: 'Weekly newsletter',
    description: 'Tech industry updates',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    priority: 'low',
    status: 'completed'
  }
];

export const MobileDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS);
  const [activities, setActivities] = useState<RecentActivity[]>(MOCK_ACTIVITIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from the API
      // const response = await api.getDashboardStats();
      // setStats(response.data);
      setStats(MOCK_STATS);
      setActivities(MOCK_ACTIVITIES);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'message':
        return <MessageCircle className="w-4 h-4" />;
      case 'task':
        return <CheckCircle className="w-4 h-4" />;
      case 'meeting':
        return <Calendar className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'low':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const completionPercentage = Math.round(
    (stats.completedTasks / (stats.completedTasks + stats.pendingTasks)) * 100
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <h2 className="text-lg font-semibold mb-1">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name || 'User'}!
          </h2>
          <p className="text-orange-100 text-sm">
            You have {stats.unreadEmails} unread emails and {stats.pendingTasks} pending tasks.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Unread Emails</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.unreadEmails}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Inbox className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Sent Today</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.sentEmails}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Send className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Team Messages</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.teamMessages}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Active Projects</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.activeProjects}</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Progress */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Completed: {stats.completedTasks}</span>
                <span className="text-gray-600">Pending: {stats.pendingTasks}</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <p className="text-xs text-gray-500 text-center">
                {completionPercentage}% completed this week
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Compose</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>New Chat</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {activities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPriorityColor(activity.priority)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(activity.status)}
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" className="w-full mt-3 text-orange-600">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Email Summary */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Email Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Inbox className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Inbox</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.totalEmails}</span>
                  {stats.unreadEmails > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {stats.unreadEmails}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Sent</span>
                </div>
                <span className="text-sm font-medium">{stats.sentEmails}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Archive className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Drafts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.draftEmails}</span>
                  {stats.draftEmails > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {stats.draftEmails}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileDashboard;

