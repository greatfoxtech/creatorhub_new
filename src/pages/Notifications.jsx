import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Heart, MessageCircle, UserPlus, ShoppingBag, CheckCheck } from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');

  const NOTIFICATIONS = [
    {
      id: 1,
      type: 'like',
      user: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      action: 'liked your post',
      content: '"Beautiful sunset photography"',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'follow',
      user: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      action: 'started following you',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'comment',
      user: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      action: 'commented on your post',
      content: '"This is amazing! How did you capture this?"',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'purchase',
      user: 'Alex Rivera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      action: 'purchased your product',
      content: 'Premium Preset Pack',
      time: '5 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'like',
      user: 'Chris Taylor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
      action: 'liked your story',
      time: '1 day ago',
      read: true
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'purchase': return <ShoppingBag className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredNotifications = NOTIFICATIONS.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-gray-400">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          <Button variant="outline" className="border-gray-700 text-white">
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="bg-[#121726] border-gray-800">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-[#4368D9] text-white">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="like">Likes</TabsTrigger>
            <TabsTrigger value="comment">Comments</TabsTrigger>
            <TabsTrigger value="follow">Follows</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`bg-[#121726] border-gray-800 ${!notif.read ? 'border-l-4 border-l-[#4368D9]' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={notif.avatar} />
                    <AvatarFallback>{notif.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIcon(notif.type)}
                        <p className="text-white">
                          <span className="font-semibold">{notif.user}</span>
                          {' '}{notif.action}
                        </p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-[#4368D9]" />
                      )}
                    </div>
                    
                    {notif.content && (
                      <p className="text-sm text-gray-400 mb-2">{notif.content}</p>
                    )}
                    
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredNotifications.length === 0 && (
            <Card className="bg-[#121726] border-gray-800 p-12 text-center">
              <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
              <p className="text-gray-400">You're all caught up!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}