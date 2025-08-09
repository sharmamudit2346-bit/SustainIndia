import { NextResponse } from 'next/server';
import { mockCropRecommendations } from '@/data/mockData';

// Simulated AI recommendations
const generateRecommendations = (crop: string, region: string, soilType: string, season: string) => {
  const baseRecommendation = mockCropRecommendations.find(r => r.crop === crop) || mockCropRecommendations[0];
  
  // Simulate AI-powered adjustments based on inputs
  const adjustments = {
    waterRequirement: baseRecommendation.waterRequirement * (soilType === 'Sandy' ? 1.2 : soilType === 'Clay' ? 0.8 : 1.0),
    expectedYield: baseRecommendation.expectedYield * (region === 'Punjab' ? 1.1 : region === 'Maharashtra' ? 1.05 : 1.0),
    sustainability: Math.min(95, baseRecommendation.sustainability + (season === 'Kharif' ? 5 : 0))
  };

  return {
    ...baseRecommendation,
    ...adjustments,
    region,
    soilType,
    season,
    timestamp: new Date().toISOString(),
    aiConfidence: Math.floor(Math.random() * 15) + 85 // 85-100%
  };
};

export async function POST(request: Request) {
  try {
    const { crop, region, soilType, season } = await request.json();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const recommendation = generateRecommendations(crop, region, soilType, season);
    
    return NextResponse.json({
      success: true,
      data: recommendation,
      ecoPointsEarned: 50,
      message: 'AI recommendations generated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get('crop');
  const region = searchParams.get('region');
  
  if (!crop || !region) {
    return NextResponse.json(
      { success: false, error: 'Crop and region parameters required' },
      { status: 400 }
    );
  }
  
  const recommendation = mockCropRecommendations.find(r => 
    r.crop.toLowerCase() === crop.toLowerCase() && 
    r.region.toLowerCase() === region.toLowerCase()
  ) || mockCropRecommendations[0];
  
  return NextResponse.json({
    success: true,
    data: recommendation
  });
}
