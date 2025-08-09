export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  level: number;
  xp: number;
  ecoPoints: number;
  badges: Badge[];
  achievements: Achievement[];
  carbonFootprint: number;
  waterSaved: number;
  treesPlanted: number;
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: number;
  completed: boolean;
}

export interface StateLeaderboard {
  state: string;
  code: string;
  rank: number;
  ecoPoints: number;
  carbonReduced: number;
  waterSaved: number;
  treesPlanted: number;
  population: number;
  topUsers: User[];
}

export interface CropRecommendation {
  crop: string;
  region: string;
  soilType: string;
  season: string;
  waterRequirement: number;
  nutrientRequirement: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  expectedYield: number;
  sustainability: number;
  recommendations: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'water' | 'carbon' | 'agriculture' | 'waste';
  startDate: string;
  endDate: string;
  target: number;
  progress: number;
  participants: number;
  reward: number;
  status: 'active' | 'upcoming' | 'completed';
}

// Mock Data
export const mockUser: User = {
  id: '1',
  name: 'Priya Sharma',
  avatar: '👩‍🌾',
  location: 'Maharashtra',
  level: 12,
  xp: 2840,
  ecoPoints: 15680,
  badges: [
    { id: '1', name: 'Water Warrior', description: 'Saved 1000L of water', icon: '💧', rarity: 'rare' },
    { id: '2', name: 'Carbon Crusher', description: 'Reduced 100kg CO₂', icon: '🌱', rarity: 'epic' },
    { id: '3', name: 'Tree Planter', description: 'Planted 10 trees', icon: '🌳', rarity: 'common' },
  ],
  achievements: [
    { id: '1', title: 'Green Commuter', description: 'Use public transport 30 days', progress: 22, target: 30, reward: 500, completed: false },
    { id: '2', title: 'Plastic Free', description: 'Avoid plastic for 7 days', progress: 7, target: 7, reward: 300, completed: true },
  ],
  carbonFootprint: 2.4,
  waterSaved: 1250,
  treesPlanted: 12,
  streak: 15,
};

export const mockBadges: Badge[] = [
  { id: '1', name: 'Water Warrior', description: 'Saved 1000L of water', icon: '💧', rarity: 'rare' },
  { id: '2', name: 'Carbon Crusher', description: 'Reduced 100kg CO₂', icon: '🌱', rarity: 'epic' },
  { id: '3', name: 'Tree Planter', description: 'Planted 10 trees', icon: '🌳', rarity: 'common' },
  { id: '4', name: 'Eco Explorer', description: 'Complete 50 challenges', icon: '🔍', rarity: 'rare' },
  { id: '5', name: 'Green Guardian', description: 'Maintain 30-day streak', icon: '🛡️', rarity: 'legendary' },
  { id: '6', name: 'Solar Supporter', description: 'Use renewable energy', icon: '☀️', rarity: 'epic' },
  { id: '7', name: 'Plastic-Free Pro', description: 'Zero plastic week', icon: '🚫', rarity: 'rare' },
  { id: '8', name: 'Compost King', description: 'Create 10kg compost', icon: '♻️', rarity: 'common' },
];

export const mockLeaderboard: StateLeaderboard[] = [
  {
    state: 'Maharashtra',
    code: 'MH',
    rank: 1,
    ecoPoints: 2456780,
    carbonReduced: 45600,
    waterSaved: 1245000,
    treesPlanted: 23400,
    population: 112374333,
    topUsers: [mockUser],
  },
  {
    state: 'Tamil Nadu',
    code: 'TN',
    rank: 2,
    ecoPoints: 2234560,
    carbonReduced: 42300,
    waterSaved: 1156000,
    treesPlanted: 21800,
    population: 72147030,
    topUsers: [],
  },
  {
    state: 'Karnataka',
    code: 'KA',
    rank: 3,
    ecoPoints: 2098750,
    carbonReduced: 39800,
    waterSaved: 1089000,
    treesPlanted: 20500,
    population: 61095297,
    topUsers: [],
  },
  {
    state: 'Gujarat',
    code: 'GJ',
    rank: 4,
    ecoPoints: 1987650,
    carbonReduced: 37200,
    waterSaved: 1023000,
    treesPlanted: 19200,
    population: 60439692,
    topUsers: [],
  },
  {
    state: 'Uttar Pradesh',
    code: 'UP',
    rank: 5,
    ecoPoints: 1876540,
    carbonReduced: 35100,
    waterSaved: 967000,
    treesPlanted: 18100,
    population: 199812341,
    topUsers: [],
  },
];

export const mockCropRecommendations: CropRecommendation[] = [
  {
    crop: 'Rice',
    region: 'Punjab',
    soilType: 'Alluvial',
    season: 'Kharif',
    waterRequirement: 1200,
    nutrientRequirement: { nitrogen: 120, phosphorus: 60, potassium: 40 },
    expectedYield: 4.5,
    sustainability: 75,
    recommendations: [
      'Use drip irrigation to save 30% water',
      'Apply organic fertilizers to improve soil health',
      'Implement System of Rice Intensification (SRI)',
      'Monitor soil moisture using IoT sensors',
    ],
  },
  {
    crop: 'Wheat',
    region: 'Haryana',
    soilType: 'Loamy',
    season: 'Rabi',
    waterRequirement: 450,
    nutrientRequirement: { nitrogen: 100, phosphorus: 50, potassium: 30 },
    expectedYield: 3.8,
    sustainability: 85,
    recommendations: [
      'Use precision agriculture for optimal nutrient application',
      'Practice crop rotation with legumes',
      'Implement zero-tillage farming',
      'Use weather-based irrigation scheduling',
    ],
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Water Warrior Month',
    description: 'Collectively save 20 million liters of water across India',
    type: 'water',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    target: 20000000,
    progress: 15234567,
    participants: 145670,
    reward: 1000,
    status: 'active',
  },
  {
    id: '2',
    title: 'Carbon Neutral February',
    description: 'Reduce carbon footprint by 50,000 tonnes nationwide',
    type: 'carbon',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    target: 50000,
    progress: 0,
    participants: 89234,
    reward: 1500,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Million Trees March',
    description: 'Plant 1 million trees across Indian cities',
    type: 'agriculture',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    target: 1000000,
    progress: 0,
    participants: 67890,
    reward: 2000,
    status: 'upcoming',
  },
];

export const nationalImpact = {
  waterSaved: 45234567, // liters
  carbonReduced: 234567, // kg
  treesPlanted: 567890,
  usersActive: 1234567,
  statesParticipating: 28,
  challengesCompleted: 156,
};

export const sustainabilityQuotes = [
  "The Earth does not belong to us; we belong to the Earth. - Chief Seattle",
  "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves. - Mahatma Gandhi",
  "Be the change you wish to see in the world. - Mahatma Gandhi",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "Nature provides a free lunch, but only if we control our appetites. - William Ruckelshaus",
  "The environment is where we all meet; where we all have a mutual interest. - Lady Bird Johnson",
];

export const dailyMissions = [
  { id: '1', title: 'Use Public Transport', description: 'Take bus/metro instead of private vehicle', points: 50, icon: '🚌' },
  { id: '2', title: 'Plastic-Free Shopping', description: 'Shop without using plastic bags', points: 30, icon: '🛍️' },
  { id: '3', title: 'Save Water', description: 'Reduce shower time by 2 minutes', points: 40, icon: '💧' },
  { id: '4', title: 'Eat Local', description: 'Choose locally sourced food', points: 35, icon: '🥬' },
  { id: '5', title: 'Digital Receipt', description: 'Opt for digital receipts instead of paper', points: 20, icon: '📱' },
  { id: '6', title: 'LED Switch', description: 'Replace one bulb with LED', points: 60, icon: '💡' },
  { id: '7', title: 'Compost Organic Waste', description: 'Start composting kitchen waste', points: 45, icon: '♻️' },
];

export const users = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun@example.com",
    level: 5,
    xp: 2500,
    ecoPoints: 750,
    streak: 7,
    badges: ["Early Adopter", "Green Warrior"],
    location: "Karnataka"
  }
];

export const leaderboard = [
  {
    state: "Karnataka",
    points: 15000,
    rank: 1,
    contributors: 1200
  },
  {
    state: "Maharashtra",
    points: 14500,
    rank: 2,
    contributors: 1100
  }
];

export const challenges = [
  {
    id: 1,
    title: "Plant 5 Trees",
    description: "Plant and nurture 5 trees in your locality",
    points: 500,
    participants: 250,
    deadline: "2025-12-31",
    progress: 0
  },
  {
    id: 2,
    title: "Zero Waste Week",
    description: "Generate zero plastic waste for a week",
    points: 300,
    participants: 150,
    deadline: "2025-08-31",
    progress: 0
  }
];

export const ecoActivities = [
  {
    id: 1,
    activity: "Tree Planted",
    points: 100,
    date: "2025-08-09"
  },
  {
    id: 2,
    activity: "Used Public Transport",
    points: 50,
    date: "2025-08-09"
  }
];
