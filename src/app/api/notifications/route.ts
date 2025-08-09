import { NextResponse } from 'next/server';

// Simulated notifications database
let notifications: { [userId: string]: any[] } = {
  default: [
    {
      id: '1',
      type: 'mission',
      title: 'Daily Mission Available!',
      message: 'Use public transport today and earn 50 EcoPoints',
      icon: '🚌',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'normal'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Badge Unlocked!',
      message: 'Congratulations! You earned the "Water Warrior" badge',
      icon: '🏆',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'challenge',
      title: 'Water Challenge Update',
      message: 'You\'re in the top 10% for this month\'s water saving challenge!',
      icon: '💧',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      priority: 'normal'
    }
  ]
};

const generateAINotification = () => {
  const tips = [
    'Switch to LED bulbs to save energy and reduce carbon footprint',
    'Taking shorter showers can save up to 25 gallons per shower',
    'Unplugging electronics when not in use can reduce energy consumption by 10%',
    'Choosing local produce reduces transportation emissions significantly',
    'Using a reusable water bottle prevents 1,460 plastic bottles per year'
  ];
  
  const tip = tips[Math.floor(Math.random() * tips.length)];
  
  return {
    id: Date.now().toString(),
    type: 'ai_tip',
    title: 'AI Eco Tip',
    message: tip,
    icon: '🤖',
    timestamp: new Date().toISOString(),
    read: false,
    priority: 'low'
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'default';
  const type = searchParams.get('type'); // 'unread', 'all', specific type
  const limit = parseInt(searchParams.get('limit') || '10');
  
  let userNotifications = notifications[userId] || [];
  
  // Filter by type if specified
  if (type && type !== 'all') {
    if (type === 'unread') {
      userNotifications = userNotifications.filter(n => !n.read);
    } else {
      userNotifications = userNotifications.filter(n => n.type === type);
    }
  }
  
  // Sort by timestamp (newest first) and limit
  userNotifications = userNotifications
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
  
  const unreadCount = (notifications[userId] || []).filter(n => !n.read).length;
  
  return NextResponse.json({
    success: true,
    data: {
      notifications: userNotifications,
      unreadCount,
      totalCount: (notifications[userId] || []).length
    }
  });
}

export async function POST(request: Request) {
  try {
    const { userId = 'default', action, notificationId, type: notificationType } = await request.json();
    
    if (!notifications[userId]) {
      notifications[userId] = [];
    }
    
    if (action === 'markAsRead') {
      if (notificationId) {
        // Mark specific notification as read
        const notification = notifications[userId].find(n => n.id === notificationId);
        if (notification) {
          notification.read = true;
        }
      } else {
        // Mark all as read
        notifications[userId].forEach(n => n.read = true);
      }
      
      return NextResponse.json({
        success: true,
        message: 'Notification(s) marked as read'
      });
    }
    
    if (action === 'delete') {
      if (notificationId) {
        notifications[userId] = notifications[userId].filter(n => n.id !== notificationId);
      } else {
        notifications[userId] = [];
      }
      
      return NextResponse.json({
        success: true,
        message: 'Notification(s) deleted'
      });
    }
    
    if (action === 'create') {
      let newNotification;
      
      if (notificationType === 'ai_tip') {
        newNotification = generateAINotification();
      } else {
        const { title, message, icon, priority = 'normal' } = await request.json();
        newNotification = {
          id: Date.now().toString(),
          type: notificationType || 'general',
          title,
          message,
          icon: icon || '📢',
          timestamp: new Date().toISOString(),
          read: false,
          priority
        };
      }
      
      notifications[userId].unshift(newNotification);
      
      return NextResponse.json({
        success: true,
        data: newNotification,
        message: 'Notification created'
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process notification action' },
      { status: 500 }
    );
  }
}

// WebSocket simulation for real-time notifications (simplified)
export async function PUT(request: Request) {
  const { userId = 'default' } = await request.json();
  
  // Simulate sending a real-time notification
  const aiTip = generateAINotification();
  
  if (!notifications[userId]) {
    notifications[userId] = [];
  }
  
  notifications[userId].unshift(aiTip);
  
  return NextResponse.json({
    success: true,
    data: aiTip,
    message: 'Real-time notification sent'
  });
}
