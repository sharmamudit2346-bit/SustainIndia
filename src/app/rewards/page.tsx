'use client';

import { useState } from 'react';
import { Gift, Award, Star, Lock, CheckCircle, ExternalLink, Share2, Download } from 'lucide-react';
import { mockBadges, mockUser } from '@/data/mockData';

type TabType = 'badges' | 'achievements' | 'perks' | 'certificates';

interface Perk {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'discount' | 'voucher' | 'experience' | 'product';
  brand: string;
  image: string;
  discount: string;
  available: boolean;
}

const mockPerks: Perk[] = [
  {
    id: '1',
    title: '20% Off Organic Groceries',
    description: 'Get 20% discount on organic fruits, vegetables, and groceries',
    pointsCost: 500,
    category: 'discount',
    brand: 'EcoMart',
    image: '🥬',
    discount: '20%',
    available: true,
  },
  {
    id: '2',
    title: 'Electric Vehicle Test Drive',
    description: 'Free test drive experience with premium electric vehicles',
    pointsCost: 1000,
    category: 'experience',
    brand: 'GreenDrive',
    image: '🚗',
    discount: 'Free',
    available: true,
  },
  {
    id: '3',
    title: 'Solar Panel Consultation',
    description: 'Free home visit and consultation for solar panel installation',
    pointsCost: 1500,
    category: 'experience',
    brand: 'SunPower India',
    image: '☀️',
    discount: 'Free',
    available: true,
  },
  {
    id: '4',
    title: 'Eco-Friendly Phone Case',
    description: 'Biodegradable phone case made from natural materials',
    pointsCost: 800,
    category: 'product',
    brand: 'GreenTech',
    image: '📱',
    discount: '100%',
    available: false,
  },
];

export default function Rewards() {
  const [activeTab, setActiveTab] = useState<TabType>('badges');
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-600';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getBadgeGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'shadow-yellow-300 animate-pulse-glow';
      case 'epic':
        return 'shadow-purple-300';
      case 'rare':
        return 'shadow-blue-300';
      default:
        return '';
    }
  };

  const userBadgeIds = mockUser.badges.map(b => b.id);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="h-12 w-12 text-eco-green-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Rewards & Achievements</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Unlock badges, earn certificates, and redeem exclusive perks for your environmental impact
          </p>
        </div>

        {/* User Stats */}
        <div className="bg-gradient-to-r from-eco-green-500 to-deep-blue-500 rounded-2xl p-8 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{mockUser.ecoPoints.toLocaleString()}</div>
              <div className="text-sm opacity-90">EcoPoints Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{mockUser.badges.length}</div>
              <div className="text-sm opacity-90">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{mockUser.level}</div>
              <div className="text-sm opacity-90">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{mockUser.streak}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-2 border border-white/20 dark:border-gray-700/20">
            <div className="flex space-x-2">
              {[
                { id: 'badges', label: 'Badges', icon: Award },
                { id: 'achievements', label: 'Achievements', icon: Star },
                { id: 'perks', label: 'Perks', icon: Gift },
                { id: 'certificates', label: 'Certificates', icon: Download }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-eco-green-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-gray-700/30'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'badges' && (
          <div className="space-y-8">
            {/* Badge Collection */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockBadges.map((badge) => {
                const isUnlocked = userBadgeIds.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    onClick={() => setSelectedBadge(badge.id)}
                    className={`relative cursor-pointer group transition-all duration-300 transform hover:scale-105 ${
                      !isUnlocked ? 'opacity-60' : ''
                    }`}
                  >
                    <div className={`bg-gradient-to-br ${getBadgeRarityColor(badge.rarity)} p-1 rounded-2xl ${getBadgeGlow(badge.rarity)}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full">
                        <div className="text-center">
                          <div className="text-4xl mb-3">{badge.icon}</div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {badge.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {badge.description}
                          </p>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                            badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                            badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {badge.rarity.toUpperCase()}
                          </div>
                        </div>
                        
                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                            <Lock className="h-8 w-8 text-white" />
                          </div>
                        )}
                        
                        {isUnlocked && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="h-6 w-6 text-eco-green-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {mockUser.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 ${
                  achievement.completed ? 'border-eco-green-300 dark:border-eco-green-600' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {achievement.completed && (
                        <CheckCircle className="h-6 w-6 text-eco-green-500" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {achievement.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Progress: {achievement.progress}/{achievement.target}
                        </span>
                        <span className="text-sm font-medium text-eco-green-600 dark:text-eco-green-400">
                          {Math.round((achievement.progress / achievement.target) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            achievement.completed ? 'bg-eco-green-500' : 'bg-eco-green-400'
                          }`}
                          style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">
                      +{achievement.reward}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">EcoPoints</div>
                    
                    {achievement.completed && (
                      <button className="mt-3 bg-eco-green-500 hover:bg-eco-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                        Claim Reward
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'perks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPerks.map((perk) => (
              <div
                key={perk.id}
                className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden transition-all duration-300 hover:scale-105 ${
                  !perk.available ? 'opacity-60' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{perk.image}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      perk.category === 'discount' ? 'bg-blue-100 text-blue-800' :
                      perk.category === 'experience' ? 'bg-purple-100 text-purple-800' :
                      perk.category === 'product' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {perk.category.toUpperCase()}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {perk.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      By {perk.brand}
                    </div>
                    <div className="text-lg font-bold text-eco-green-600 dark:text-eco-green-400">
                      {perk.discount} OFF
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {perk.pointsCost} EcoPoints
                    </div>
                    <button
                      disabled={!perk.available || mockUser.ecoPoints < perk.pointsCost}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        perk.available && mockUser.ecoPoints >= perk.pointsCost
                          ? 'bg-eco-green-500 hover:bg-eco-green-600 text-white transform hover:scale-105'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {!perk.available ? 'Out of Stock' : 
                       mockUser.ecoPoints < perk.pointsCost ? 'Insufficient Points' : 'Redeem'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Available Certificates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Sustainability Champion
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Awarded for completing 10 environmental challenges and maintaining a 30-day streak
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span>Challenges Completed</span>
                      <span className="font-medium">8/10</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-eco-green-500 h-2 rounded-full" style={{ width: '80%' }} />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Streak Maintained</span>
                      <span className="font-medium text-eco-green-600 dark:text-eco-green-400">✓ 30 days</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed">
                    Complete 2 More Challenges
                  </button>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-eco-green-300 dark:border-eco-green-600">
                <div className="text-center">
                  <div className="text-6xl mb-4">📜</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Water Conservation Expert
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Earned for saving over 1000 liters of water through sustainable practices
                  </p>
                  
                  <div className="bg-eco-green-50 dark:bg-eco-green-900/20 rounded-lg p-4 mb-6">
                    <div className="text-sm text-eco-green-800 dark:text-eco-green-400">
                      <div className="font-medium">Achievement Unlocked!</div>
                      <div>Water Saved: {mockUser.waterSaved}L</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-eco-green-500 hover:bg-eco-green-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex-1 bg-deep-blue-500 hover:bg-deep-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-4 border-eco-green-500 shadow-2xl">
              <div className="text-center">
                <div className="text-eco-green-600 dark:text-eco-green-400 text-sm font-medium mb-2">
                  SUSTAININDIA PLATFORM
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  CERTIFICATE OF ACHIEVEMENT
                </h2>
                
                <div className="mb-6">
                  <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">This is to certify that</div>
                  <div className="text-3xl font-bold gradient-text mb-2">{mockUser.name}</div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    has demonstrated exceptional commitment to environmental sustainability
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">
                      {mockUser.waterSaved}L
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Water Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-deep-blue-600 dark:text-deep-blue-400">
                      {mockUser.carbonFootprint}kg
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Reduced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warm-yellow-600 dark:text-warm-yellow-400">
                      {mockUser.treesPlanted}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Trees Planted</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-end text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    <div>Issued: {new Date().toLocaleDateString()}</div>
                    <div>Certificate ID: SI-{mockUser.id}-2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-eco-green-600 dark:text-eco-green-400 font-semibold">
                      SustainIndia Team
                    </div>
                    <div>Platform Authority</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
