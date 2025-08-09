import { NextResponse } from 'next/server';
import { mockBadges } from '@/data/mockData';

// Simulated user rewards and redemptions
let userRewards: { [userId: string]: { badges: string[], redeemedPerks: string[], ecoPoints: number } } = {
  default: {
    badges: ['1', '2', '3'], // User has first 3 badges
    redeemedPerks: [],
    ecoPoints: 15680
  }
};

const availablePerks = [
  {
    id: '1',
    title: '20% Off Organic Groceries',
    description: 'Get 20% discount on organic fruits, vegetables, and groceries',
    pointsCost: 500,
    category: 'discount',
    brand: 'EcoMart',
    discount: '20%',
    available: true,
    stock: 100
  },
  {
    id: '2',
    title: 'Electric Vehicle Test Drive',
    description: 'Free test drive experience with premium electric vehicles',
    pointsCost: 1000,
    category: 'experience',
    brand: 'GreenDrive',
    discount: 'Free',
    available: true,
    stock: 50
  },
  {
    id: '3',
    title: 'Solar Panel Consultation',
    description: 'Free home visit and consultation for solar panel installation',
    pointsCost: 1500,
    category: 'experience',
    brand: 'SunPower India',
    discount: 'Free',
    available: true,
    stock: 25
  },
  {
    id: '4',
    title: 'Eco-Friendly Phone Case',
    description: 'Biodegradable phone case made from natural materials',
    pointsCost: 800,
    category: 'product',
    brand: 'GreenTech',
    discount: '100%',
    available: false,
    stock: 0
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'default';
  const type = searchParams.get('type'); // 'badges', 'perks', 'achievements'
  
  const userReward = userRewards[userId] || { badges: [], redeemedPerks: [], ecoPoints: 0 };
  
  if (type === 'badges') {
    const userBadges = mockBadges.map(badge => ({
      ...badge,
      unlocked: userReward.badges.includes(badge.id),
      unlockedAt: userReward.badges.includes(badge.id) ? new Date().toISOString() : null
    }));
    
    return NextResponse.json({
      success: true,
      data: {
        badges: userBadges,
        totalUnlocked: userReward.badges.length,
        totalAvailable: mockBadges.length
      }
    });
  }
  
  if (type === 'perks') {
    const perksWithUserData = availablePerks.map(perk => ({
      ...perk,
      canRedeem: userReward.ecoPoints >= perk.pointsCost && perk.available,
      alreadyRedeemed: userReward.redeemedPerks.includes(perk.id)
    }));
    
    return NextResponse.json({
      success: true,
      data: {
        perks: perksWithUserData,
        userEcoPoints: userReward.ecoPoints,
        totalRedeemed: userReward.redeemedPerks.length
      }
    });
  }
  
  // Return all rewards data
  return NextResponse.json({
    success: true,
    data: {
      badges: userReward.badges.length,
      ecoPoints: userReward.ecoPoints,
      redeemedPerks: userReward.redeemedPerks.length,
      availablePerks: availablePerks.filter(p => p.available).length
    }
  });
}

export async function POST(request: Request) {
  try {
    const { userId = 'default', action, itemId, pointsCost } = await request.json();
    
    if (!userRewards[userId]) {
      userRewards[userId] = { badges: [], redeemedPerks: [], ecoPoints: 15680 };
    }
    
    if (action === 'redeemPerk') {
      const perk = availablePerks.find(p => p.id === itemId);
      if (!perk) {
        return NextResponse.json(
          { success: false, error: 'Perk not found' },
          { status: 404 }
        );
      }
      
      if (!perk.available || perk.stock <= 0) {
        return NextResponse.json(
          { success: false, error: 'Perk not available' },
          { status: 400 }
        );
      }
      
      if (userRewards[userId].ecoPoints < perk.pointsCost) {
        return NextResponse.json(
          { success: false, error: 'Insufficient EcoPoints' },
          { status: 400 }
        );
      }
      
      if (userRewards[userId].redeemedPerks.includes(itemId)) {
        return NextResponse.json(
          { success: false, error: 'Perk already redeemed' },
          { status: 400 }
        );
      }
      
      // Redeem the perk
      userRewards[userId].ecoPoints -= perk.pointsCost;
      userRewards[userId].redeemedPerks.push(itemId);
      perk.stock -= 1;
      
      return NextResponse.json({
        success: true,
        data: {
          perkRedeemed: true,
          perkTitle: perk.title,
          pointsDeducted: perk.pointsCost,
          remainingPoints: userRewards[userId].ecoPoints,
          redemptionCode: `ECO-${Date.now()}-${itemId}`,
          message: `Successfully redeemed ${perk.title}!`
        }
      });
    }
    
    if (action === 'unlockBadge') {
      const badge = mockBadges.find(b => b.id === itemId);
      if (!badge) {
        return NextResponse.json(
          { success: false, error: 'Badge not found' },
          { status: 404 }
        );
      }
      
      if (userRewards[userId].badges.includes(itemId)) {
        return NextResponse.json(
          { success: false, error: 'Badge already unlocked' },
          { status: 400 }
        );
      }
      
      userRewards[userId].badges.push(itemId);
      
      return NextResponse.json({
        success: true,
        data: {
          badgeUnlocked: true,
          badgeName: badge.name,
          badgeDescription: badge.description,
          message: `Congratulations! You unlocked the "${badge.name}" badge!`
        }
      });
    }
    
    if (action === 'addEcoPoints') {
      const points = pointsCost || 0;
      userRewards[userId].ecoPoints += points;
      
      return NextResponse.json({
        success: true,
        data: {
          pointsAdded: points,
          totalPoints: userRewards[userId].ecoPoints
        }
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process reward action' },
      { status: 500 }
    );
  }
}
