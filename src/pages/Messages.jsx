import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');

  const CONVERSATIONS = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahjohnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMessage: 'Thanks for the quick response!',
      time: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mikechen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      lastMessage: 'Can you send me the files?',
      time: '1h ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Emma Wilson',
      username: '@emmawilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      lastMessage: 'Great work on the project!',
      time: '3h ago',
      unread: 1,
      online: true
    }
  ];

  const MESSAGES = [
    {
      id: 1,
      sender: 'other',
      text: 'Hey! I love your recent posts',
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'me',
      text: 'Thank you so much! 😊',
      time: '10:32 AM'
    },
    {
      id: 3,
      sender: 'other',
      text: 'Do you offer any courses or tutorials?',
      time: '10:35 AM'
    },
    {
      id: 4,
      sender: 'me',
      text: 'Yes! I have a photography course available. Check out my Products page.',
      time: '10:36 AM'
    },
    {
      id: 5,
      sender: 'other',
      text: 'Thanks for the quick response!',
      time: '10:38 AM'
    }
  ];

  const currentChat = CONVERSATIONS.find(c => c.id === selectedChat);

  return (
    <div className="h-[calc(100vh-8rem)] bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto h-full flex gap-6">
        {/* Conversations List */}
        <Card className="w-80 bg-[#121726] border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 bg-[#1A1F2E] border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 cursor-pointer transition-colors border-b border-gray-800 ${
                  selectedChat === chat.id ? 'bg-[#1A1F2E]' : 'hover:bg-[#1A1F2E]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121726]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-[#4368D9] text-white">{chat.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 bg-[#121726] border-gray-800 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={currentChat.avatar} />
                  <AvatarFallback>{currentChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {currentChat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121726]" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{currentChat.name}</h3>
                <p className="text-sm text-gray-400">{currentChat.username}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {MESSAGES.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'me'
                      ? 'bg-[#4368D9] text-white'
                      : 'bg-[#1A1F2E] text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 bg-[#1A1F2E] border-gray-700 text-white"
              />
              <Button size="icon" className="bg-[#4368D9] hover:bg-[#3a59b4]">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}