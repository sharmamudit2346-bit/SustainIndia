import { NextResponse } from 'next/server';
import { mockUser } from '@/data/mockData';

// Simulated database
let userData = { ...mockUser };

export async function GET() {
  return NextResponse.json(userData);
}

export async function POST(request: Request) {
  const updates = await request.json();
  userData = { ...userData, ...updates };
  return NextResponse.json(userData);
}

export async function PUT(request: Request) {
  const updates = await request.json();
  userData = { ...userData, ...updates };
  return NextResponse.json(userData);
}
