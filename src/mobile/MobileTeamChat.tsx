import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../context/AuthContext';

// Mock data for chats
const MOCK_CHATS = [
  {
    id: 'chat-1',
    name: 'Project Alpha Team',
    type: 'group',
    participants: [
      { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-2', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'user-3', name: 'Mike Wilson', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 'user-4', name: 'Emily Brown', avatar: 'https://i.pravatar.cc/150?img=9' }
    ],
    lastMessage: {
      id: 'msg-1',
      sender: { id: 'user-2', name: 'Sarah Johnson' },
      text: 'I will send the updated designs tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false
    },
    unreadCount: 3,
    pinned: true
  },
  {
    id: 'chat-2',
    name: 'Marketing Team',
    type: 'group',
    participants: [
      { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'user-5', name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?img=15' },
      { id: 'user-6', name: 'Lisa Park', avatar: 'https://i.pravatar.cc/150?img=20' }
    ],
    lastMessage: {
      id: 'msg-2',
      sender: { id: 'user-5', name: 'Alex Chen' },
      text: 'Campaign performance looks great this month!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: true
    },
    unreadCount: 0,
    pinned: false
  },
  {
    id: 'chat-3',
    name: 'Sarah Johnson',
    type: 'direct',
    participants: [
      { id: 'user-2', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' }
    ],
    lastMessage: {
      id: 'msg-3',
      sender: { id: 'user-2', name: 'Sarah Johnson' },
      text: 'Thanks for the feedback on the proposal',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
      read: true
    },
    unreadCount: 0,
    pinned: false
  }
];

// Mock messages for a specific chat
const MOCK_MESSAGES = {
  'chat-1': [
    {
      id: 'msg-1-1',
      sender: { id: 'user-2', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
      text: 'I will send the updated designs tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false,
      status: 'sent'
    },
    {
      id: 'msg-1-2',
      sender: { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      text: 'Great, looking forward to seeing them!',
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      read: true,
      status: 'sent'
    },
    {
      id: 'msg-1-3',
      sender: { id: 'user-3', name: 'Mike Wilson', avatar: 'https://i.pravatar.cc/150?img=12' },
      text: 'Should we schedule a review meeting for Friday?',
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      read: true,
      status: 'sent'
    },
    {
      id: 'msg-1-4',
      sender: { id: 'user-2', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
      text: 'Yes, I will include both desktop and mobile versions.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      read: true,
      status: 'sent'
    },
    {
      id: 'msg-1-5',
      sender: { id: 'user-4', name: 'Emily Brown', avatar: 'https://i.pravatar.cc/150?img=9' },
      text: 'Do we have the copy finalized for the landing page?',
      timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      read: true,
      status: 'sent'
    },
    {
      id: 'msg-1-6',
      sender: { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      text: 'Marketing team is still working on it. Should be ready by end of week.',
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      read: true,
      status: 'sent'
    },
    {
      id: 'msg-1-7',
      sender: { id: 'user-3', name: 'Mike Wilson', avatar: 'https://i.pravatar.cc/150?img=12' },
      text: 'I think we should also consider adding a testimonials section.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: true,
      status: 'sent'
    },
    {
      id: 'msg-1-8',
      sender: { id: 'user-2', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5' },
      text: 'Good idea. I will add that to the design.',
      timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
      read: true,
      status: 'sent'
    }
  ]
};

interface Chat {
  id: string;
  name: string;
  type: 'group' | 'direct';
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  lastMessage: {
    id: string;
    sender: {
      id: string;
      name: string;
    };
    text: string;
    timestamp: string;
    read: boolean;
  };
  unreadCount: number;
  pinned: boolean;
}

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  read: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export const MobileTeamChat: React.FC = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>(['user-1', 'user-2', 'user-5']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat && MOCK_MESSAGES[selectedChat as keyof typeof MOCK_MESSAGES]) {
      setMessages(MOCK_MESSAGES[selectedChat as keyof typeof MOCK_MESSAGES]);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        id: user?.id || 'current-user',
        name: user?.name || 'You',
        avatar: user?.avatar || ''
      },
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message sending
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 1000);
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

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ChatListItem: React.FC<{ chat: Chat }> = ({ chat }) => (
    <Card 
      className={`mb-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        selectedChat === chat.id ? 'ring-2 ring-orange-500 bg-orange-50' : ''
      }`}
      onClick={() => setSelectedChat(chat.id)}
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {chat.type === 'group' ? (
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-orange-600">
                  {chat.participants.length}
                </span>
              </div>
            ) : (
              <Avatar className="w-10 h-10">
                <AvatarImage src={chat.participants[0]?.avatar} />
                <AvatarFallback>
                  {chat.participants[0]?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            {chat.type === 'direct' && onlineUsers.includes(chat.participants[0]?.id) && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium truncate ${
                chat.unreadCount > 0 ? 'font-semibold' : ''
              }`}>
                {chat.name}
              </h3>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">
                  {formatTimestamp(chat.lastMessage.timestamp)}
                </span>
                {chat.unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs min-w-[20px] h-5">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 truncate mt-1">
              {chat.lastMessage.sender.name}: {chat.lastMessage.text}
            </p>
            
            {chat.type === 'group' && (
              <div className="flex items-center mt-2 space-x-1">
                {chat.participants.slice(0, 3).map(participant => (
                  <Avatar key={participant.id} className="w-4 h-4">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="text-xs">
                      {participant.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {chat.participants.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{chat.participants.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MessageItem: React.FC<{ message: Message; isOwn: boolean }> = ({ message, isOwn }) => (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-[80%] ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isOwn && (
          <Avatar className="w-6 h-6">
            <AvatarImage src={message.sender.avatar} />
            <AvatarFallback className="text-xs">
              {message.sender.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={`rounded-lg px-3 py-2 ${
          isOwn 
            ? 'bg-orange-500 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          {!isOwn && (
            <p className="text-xs font-medium mb-1 text-gray-600">
              {message.sender.name}
            </p>
          )}
          <p className="text-sm">{message.text}</p>
          <div className={`flex items-center justify-between mt-1 text-xs ${
            isOwn ? 'text-orange-100' : 'text-gray-500'
          }`}>
            <span>{formatTimestamp(message.timestamp)}</span>
            {isOwn && (
              <span className="ml-2">
                {message.status === 'sending' && '⏳'}
                {message.status === 'sent' && '✓'}
                {message.status === 'delivered' && '✓✓'}
                {message.status === 'read' && '✓✓'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!selectedChat) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Team Chat</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredChats.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No chats found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredChats.map(chat => (
                <ChatListItem key={chat.id} chat={chat} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChat(null)}
              className="p-1"
            >
              ←
            </Button>
            
            <div className="flex items-center space-x-3">
              {currentChat?.type === 'group' ? (
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-orange-600">
                    {currentChat.participants.length}
                  </span>
                </div>
              ) : (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentChat?.participants[0]?.avatar} />
                  <AvatarFallback>
                    {currentChat?.participants[0]?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div>
                <h2 className="text-lg font-semibold">{currentChat?.name}</h2>
                {currentChat?.type === 'group' && (
                  <p className="text-sm text-gray-500">
                    {currentChat.participants.length} members
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            isOwn={message.sender.id === (user?.id || 'current-user')}
          />
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Someone is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileTeamChat;

