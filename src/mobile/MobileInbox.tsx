import React, { useState, useEffect } from 'react';
import { Mail, Star, Paperclip, Search, Filter, MoreVertical, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Mock data for development
const MOCK_EMAILS = [
  {
    id: 'email-1',
    sender: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: null
    },
    subject: 'Meeting Tomorrow',
    preview: 'Hi, just confirming our meeting tomorrow at 10 AM. Please let me know if this time still works for you.',
    body: '<p>Hi,</p><p>Just confirming our meeting tomorrow at 10 AM. Please let me know if this time still works for you.</p><p>Best regards,<br>John</p>',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      { id: 'att-1', name: 'meeting-agenda.pdf', size: 245000, type: 'application/pdf' }
    ],
    labels: ['important', 'work'],
    folder: 'inbox'
  },
  {
    id: 'email-2',
    sender: {
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      avatar: null
    },
    subject: 'Project Update',
    preview: 'The latest project milestone has been completed. Please review the attached documents.',
    body: '<p>Hi Team,</p><p>The latest project milestone has been completed. Please review the attached documents and provide your feedback by Friday.</p><p>Thanks,<br>Sarah</p>',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    attachments: [
      { id: 'att-2', name: 'project-update.docx', size: 156000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ],
    labels: ['work', 'project'],
    folder: 'inbox'
  },
  {
    id: 'email-3',
    sender: {
      name: 'Newsletter Team',
      email: 'newsletter@techblog.com',
      avatar: null
    },
    subject: 'Weekly Tech Newsletter',
    preview: 'This week in tech: AI breakthroughs, new framework releases, and industry insights.',
    body: '<p>This week in tech:</p><ul><li>AI breakthroughs in natural language processing</li><li>New framework releases</li><li>Industry insights and trends</li></ul><p>Read more on our website.</p>',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
    labels: ['newsletter'],
    folder: 'inbox'
  },
  {
    id: 'email-4',
    sender: {
      name: 'LinkedIn',
      email: 'notifications@linkedin.com',
      avatar: null
    },
    subject: 'You have 5 new connection requests',
    preview: 'You have 5 new connection requests waiting for your response on LinkedIn.',
    body: '<p>Hello,</p><p>You have 5 new connection requests waiting for your response on LinkedIn:</p><ul><li>Jane Smith - Product Manager at Tech Co.</li><li>Michael Brown - Software Engineer at Dev Inc.</li><li>Emily Johnson - UX Designer at Design Studio</li><li>David Wilson - CTO at Startup</li><li>Lisa Chen - Marketing Director at Brand Co.</li></ul><p>Log in to LinkedIn to respond to these requests.</p>',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    attachments: [],
    labels: ['social'],
    folder: 'inbox'
  },
  {
    id: 'email-5',
    sender: {
      name: 'Travel Bookings',
      email: 'bookings@travel.com',
      avatar: null
    },
    subject: 'Flight Confirmation - JFK to SFO',
    preview: 'Your flight booking has been confirmed. Departure: JFK to SFO on July 15, 2025 at 10:30 AM.',
    body: '<p>Dear Traveler,</p><p>Your flight booking has been confirmed.</p><p><strong>Flight Details:</strong></p><p>Departure: JFK to SFO<br>Date: July 15, 2025<br>Time: 10:30 AM<br>Flight Number: AA1234<br>Confirmation Code: XYZ123</p><p>Please check in online 24 hours before your flight.</p><p>Thank you for booking with us!</p><p>Travel Bookings Team</p>',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    attachments: [
      { id: 'att-3', name: 'boarding-pass.pdf', size: 89000, type: 'application/pdf' }
    ],
    labels: ['travel', 'important'],
    folder: 'inbox'
  }
];

interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar: string | null;
  };
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  attachments: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
  }>;
  labels: string[];
  folder: string;
}

export const MobileInbox: React.FC = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'sender' | 'subject'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from the API
      // const response = await api.getEmails();
      // setEmails(response.data);
      setEmails(MOCK_EMAILS);
    } catch (error) {
      console.error('Failed to load emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadEmails();
    setRefreshing(false);
  };

  const toggleEmailSelection = (emailId: string) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const toggleStar = async (emailId: string) => {
    try {
      setEmails(prev => prev.map(email => 
        email.id === emailId 
          ? { ...email, isStarred: !email.isStarred }
          : email
      ));
      // In a real app, this would update the server
      // await api.updateEmail(emailId, { isStarred: !email.isStarred });
    } catch (error) {
      console.error('Failed to toggle star:', error);
    }
  };

  const markAsRead = async (emailId: string) => {
    try {
      setEmails(prev => prev.map(email => 
        email.id === emailId 
          ? { ...email, isRead: true }
          : email
      ));
      // In a real app, this would update the server
      // await api.updateEmail(emailId, { isRead: true });
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const deleteEmails = async (emailIds: string[]) => {
    try {
      setEmails(prev => prev.filter(email => !emailIds.includes(email.id)));
      setSelectedEmails([]);
      // In a real app, this would delete from the server
      // await api.deleteEmails(emailIds);
    } catch (error) {
      console.error('Failed to delete emails:', error);
    }
  };

  const filteredEmails = emails.filter(email => {
    const matchesSearch = 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const sortedEmails = [...filteredEmails].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
      case 'sender':
        comparison = a.sender.name.localeCompare(b.sender.name);
        break;
      case 'subject':
        comparison = a.subject.localeCompare(b.subject);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const EmailItem: React.FC<{ email: Email }> = ({ email }) => (
    <Card 
      className={`mb-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        !email.isRead ? 'border-l-4 border-l-orange-500 bg-orange-50' : ''
      } ${
        selectedEmails.includes(email.id) ? 'ring-2 ring-orange-500' : ''
      }`}
      onClick={() => markAsRead(email.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-orange-600">
                    {email.sender.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm truncate ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
                    {email.sender.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{email.sender.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{formatTimestamp(email.timestamp)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(email.id);
                  }}
                  className="p-1 h-auto"
                >
                  <Star 
                    className={`w-4 h-4 ${
                      email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                    }`} 
                  />
                </Button>
              </div>
            </div>
            
            <h3 className={`text-sm mb-1 ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
              {email.subject}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {email.preview}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {email.hasAttachments && (
                  <div className="flex items-center space-x-1">
                    <Paperclip className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{email.attachments.length}</span>
                  </div>
                )}
                {email.labels.map(label => (
                  <Badge key={label} variant="secondary" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEmailSelection(email.id);
                }}
                className="p-1 h-auto"
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Inbox</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>{filteredEmails.length} emails</span>
          <span>{filteredEmails.filter(e => !e.isRead).length} unread</span>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
          </div>
        ) : sortedEmails.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No emails found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEmails.map(email => (
              <EmailItem key={email.id} email={email} />
            ))}
          </div>
        )}
      </div>

      {/* Selection Actions */}
      {selectedEmails.length > 0 && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedEmails.length} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEmails([])}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEmails(selectedEmails)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileInbox;

