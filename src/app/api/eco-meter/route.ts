import { NextResponse } from 'next/server';

// Simulated carbon footprint calculation
const calculateCarbonFootprint = (data: any) => {
  const { transport, distance, electricity, foodChoice } = data;
  
  const transportEmissions = {
    private: 0.2, // kg CO2 per km
    public: 0.05,
    bicycle: 0,
    walking: 0
  };
  
  const foodEmissions = {
    meat: 3.5, // kg CO2 per day
    vegetarian: 1.5,
    vegan: 0.8,
    local: 1.0
  };
  
  const transportCO2 = (transportEmissions[transport as keyof typeof transportEmissions] || 0.2) * distance;
  const electricityCO2 = electricity * 0.82; // kg CO2 per kWh
  const foodCO2 = foodEmissions[foodChoice as keyof typeof foodEmissions] || 1.5;
  
  const totalFootprint = transportCO2 + electricityCO2 + foodCO2;
  
  // Calculate EcoPoints based on how much below average
  const averageFootprint = 4.5;
  const ecoPoints = Math.max(0, Math.floor((averageFootprint - totalFootprint) * 20));
  
  return {
    totalFootprint: parseFloat(totalFootprint.toFixed(2)),
    breakdown: {
      transport: parseFloat(transportCO2.toFixed(2)),
      electricity: parseFloat(electricityCO2.toFixed(2)),
      food: parseFloat(foodCO2.toFixed(2))
    },
    ecoPointsEarned: ecoPoints,
    rating: totalFootprint <= 2 ? 'Excellent' : totalFootprint <= 3.5 ? 'Good' : 'Needs Improvement',
    suggestions: generateSuggestions(totalFootprint, data)
  };
};

const generateSuggestions = (footprint: number, data: any) => {
  const suggestions = [];
  
  if (data.transport === 'private') {
    suggestions.push('Try using public transport or cycling to reduce emissions by up to 75%');
  }
  
  if (data.electricity > 20) {
    suggestions.push('Consider using LED bulbs and unplugging devices to save energy');
  }
  
  if (data.foodChoice === 'meat') {
    suggestions.push('Having one vegetarian day per week can reduce your food footprint by 15%');
  }
  
  if (footprint > 3) {
    suggestions.push('Small changes like shorter showers and air-drying clothes can make a big difference');
  }
  
  return suggestions;
};

export async function POST(request: Request) {
  try {
    const footprintData = await request.json();
    
    const result = calculateCarbonFootprint(footprintData);
    
    // Simulate saving to database
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate carbon footprint' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '7');
  
  // Generate mock historical data
  const historicalData = Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    footprint: parseFloat((Math.random() * 3 + 1.5).toFixed(2)),
    ecoPoints: Math.floor(Math.random() * 50 + 10)
  })).reverse();
  
  return NextResponse.json({
    success: true,
    data: historicalData,
    summary: {
      averageFootprint: parseFloat((historicalData.reduce((sum, day) => sum + day.footprint, 0) / days).toFixed(2)),
      totalEcoPoints: historicalData.reduce((sum, day) => sum + day.ecoPoints, 0),
      trend: Math.random() > 0.5 ? 'improving' : 'stable'
    }
  });
}
