import { NextResponse } from 'next/server';
import { nationalImpact } from '@/data/mockData';

// Generate analytics data
const generateAnalytics = (timeframe: string = '30days') => {
  const days = timeframe === '7days' ? 7 : timeframe === '30days' ? 30 : 365;
  
  // Generate daily data points
  const dailyData = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      waterSaved: Math.floor(Math.random() * 50000 + 100000),
      carbonReduced: Math.floor(Math.random() * 500 + 1000),
      treesPlanted: Math.floor(Math.random() * 100 + 200),
      activeUsers: Math.floor(Math.random() * 10000 + 50000),
      ecoPointsEarned: Math.floor(Math.random() * 100000 + 500000)
    };
  });
  
  // Calculate totals and trends
  const totals = dailyData.reduce((acc, day) => ({
    waterSaved: acc.waterSaved + day.waterSaved,
    carbonReduced: acc.carbonReduced + day.carbonReduced,
    treesPlanted: acc.treesPlanted + day.treesPlanted,
    activeUsers: Math.max(acc.activeUsers, day.activeUsers),
    ecoPointsEarned: acc.ecoPointsEarned + day.ecoPointsEarned
  }), { waterSaved: 0, carbonReduced: 0, treesPlanted: 0, activeUsers: 0, ecoPointsEarned: 0 });
  
  // Calculate trends (simplified)
  const recent = dailyData.slice(-7);
  const previous = dailyData.slice(-14, -7);
  
  const recentAvg = recent.reduce((sum, day) => sum + day.carbonReduced, 0) / recent.length;
  const previousAvg = previous.reduce((sum, day) => sum + day.carbonReduced, 0) / previous.length;
  const trend = ((recentAvg - previousAvg) / previousAvg * 100).toFixed(1);
  
  return {
    timeframe,
    period: `${days} days`,
    totals,
    dailyData,
    trends: {
      carbonReduction: `${trend}%`,
      userGrowth: '+12.5%',
      engagement: '+8.3%'
    },
    insights: [
      'Water conservation efforts increased by 23% this month',
      'Carbon footprint reduction is accelerating across all states',
      'Tree planting initiatives showing strong community participation',
      'EcoPoints redemption rate improved by 15%'
    ]
  };
};

const generateUserAnalytics = (userId: string) => {
  return {
    userId,
    period: '30 days',
    personalImpact: {
      waterSaved: 1250,
      carbonReduced: 45.6,
      treesPlanted: 12,
      ecoPointsEarned: 2340
    },
    rankings: {
      state: 156,
      national: 4567,
      category: 'Top 5%'
    },
    streakData: {
      current: 15,
      longest: 23,
      thisMonth: 28
    },
    achievements: {
      completed: 8,
      inProgress: 3,
      totalAvailable: 25
    },
    weeklyProgress: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      ecoPoints: Math.floor(Math.random() * 100 + 50),
      activities: Math.floor(Math.random() * 5 + 2)
    })),
    goals: {
      monthly: {
        waterSaving: { target: 2000, achieved: 1250, percentage: 62.5 },
        carbonReduction: { target: 50, achieved: 45.6, percentage: 91.2 },
        treePlanting: { target: 15, achieved: 12, percentage: 80 }
      }
    }
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'national';
  const timeframe = searchParams.get('timeframe') || '30days';
  const userId = searchParams.get('userId');
  
  try {
    if (type === 'user' && userId) {
      const userAnalytics = generateUserAnalytics(userId);
      return NextResponse.json({
        success: true,
        data: userAnalytics
      });
    }
    
    if (type === 'national') {
      const analytics = generateAnalytics(timeframe);
      return NextResponse.json({
        success: true,
        data: analytics
      });
    }
    
    if (type === 'states') {
      // Generate state-wise analytics
      const states = ['Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat', 'Punjab'];
      const stateAnalytics = states.map(state => ({
        state,
        waterSaved: Math.floor(Math.random() * 1000000 + 500000),
        carbonReduced: Math.floor(Math.random() * 50000 + 25000),
        treesPlanted: Math.floor(Math.random() * 10000 + 5000),
        activeUsers: Math.floor(Math.random() * 100000 + 50000),
        rank: states.indexOf(state) + 1,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        trendPercent: (Math.random() * 20 + 5).toFixed(1)
      }));
      
      return NextResponse.json({
        success: true,
        data: {
          timeframe,
          states: stateAnalytics,
          summary: {
            totalStates: states.length,
            topPerformer: stateAnalytics[0].state,
            averageGrowth: '+12.3%'
          }
        }
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid analytics type' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate analytics' },
      { status: 500 }
    );
  }
}
