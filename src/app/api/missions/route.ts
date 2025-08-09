import { NextResponse } from 'next/server';
import { dailyMissions } from '@/data/mockData';

// Simulated user missions state
let userMissions: { [userId: string]: { [missionId: string]: { completed: boolean, completedAt?: string } } } = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'default';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  // Get user's mission progress
  const userProgress = userMissions[userId] || {};
  
  const missionsWithProgress = dailyMissions.map(mission => ({
    ...mission,
    completed: userProgress[mission.id]?.completed || false,
    completedAt: userProgress[mission.id]?.completedAt
  }));
  
  return NextResponse.json({
    success: true,
    data: {
      missions: missionsWithProgress,
      totalCompleted: Object.values(userProgress).filter(p => p.completed).length,
      totalPoints: Object.values(userProgress)
        .filter(p => p.completed)
        .reduce((sum, _, index) => sum + dailyMissions[index]?.points || 0, 0),
      date
    }
  });
}

export async function POST(request: Request) {
  try {
    const { userId = 'default', missionId, action } = await request.json();
    
    if (action === 'complete') {
      // Initialize user missions if not exists
      if (!userMissions[userId]) {
        userMissions[userId] = {};
      }
      
      // Mark mission as completed
      userMissions[userId][missionId] = {
        completed: true,
        completedAt: new Date().toISOString()
      };
      
      const mission = dailyMissions.find(m => m.id === missionId);
      const pointsEarned = mission?.points || 0;
      
      return NextResponse.json({
        success: true,
        data: {
          missionCompleted: true,
          pointsEarned,
          message: `Great job! You earned ${pointsEarned} EcoPoints for completing "${mission?.title}"`
        }
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update mission' },
      { status: 500 }
    );
  }
}

// Reset daily missions (would typically be called by a cron job)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (userId) {
    userMissions[userId] = {};
  } else {
    userMissions = {};
  }
  
  return NextResponse.json({
    success: true,
    message: 'Daily missions reset successfully'
  });
}
