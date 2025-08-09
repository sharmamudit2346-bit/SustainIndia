import { NextResponse } from 'next/server';
import { mockChallenges } from '@/data/mockData';

// Simulated challenges data
let challengesData = [...mockChallenges];

export async function GET() {
  return NextResponse.json(challengesData);
}

export async function POST(request: Request) {
  const updates = await request.json();
  const { challengeId, progress } = updates;
  
  const challengeIndex = challengesData.findIndex(challenge => challenge.id === challengeId);
  if (challengeIndex !== -1) {
    challengesData[challengeIndex].progress += progress;
    challengesData[challengeIndex].participants += 1;
  }
  
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const { challengeId, action } = await request.json();
  
  const challengeIndex = challengesData.findIndex(challenge => challenge.id === challengeId);
  if (challengeIndex !== -1 && action === 'join') {
    challengesData[challengeIndex].participants += 1;
  }
  
  return NextResponse.json({ success: true });
}
