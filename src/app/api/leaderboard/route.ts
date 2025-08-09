import { NextResponse } from 'next/server';
import { mockLeaderboard } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get('sortBy') || 'ecoPoints';

  const leaderboardData = [...mockLeaderboard];

  // Sort leaderboard with proper type checking
  const sortedData = leaderboardData.sort((a, b) => {
    const valueA = a[sortBy as keyof typeof a];
    const valueB = b[sortBy as keyof typeof a];

    // Ensure we're comparing numbers
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueB - valueA;
    }
    return 0;
  });

  // Update ranks
  const rankedData = sortedData.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return NextResponse.json(rankedData);
}
