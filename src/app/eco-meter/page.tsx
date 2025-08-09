'use client';

import { useState, useEffect } from 'react';
import { Car, Zap, UtensilsCrossed, Home, Plus, Target, TrendingDown, Award, Calendar, CheckCircle } from 'lucide-react';
import { dailyMissions, mockUser } from '@/data/mockData';

interface DailyEntry {
  transport: string;
  distance: number;
  electricity: number;
  foodChoice: string;
  carbonFootprint: number;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  completed?: boolean;
}

export default function EcoMeter() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'missions' | 'insights'>('tracker');
  const [todayEntry, setTodayEntry] = useState<DailyEntry>({
    transport: 'public',
    distance: 10,
    electricity: 15,
    foodChoice: 'vegetarian',
    carbonFootprint: 0
  });
  const [totalFootprint, setTotalFootprint] = useState(2.4);
  const [weeklyData, setWeeklyData] = useState([2.8, 2.1, 2.5, 1.9, 2.2, 2.0, 1.8]);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [showAddEntry, setShowAddEntry] = useState(false);

  // Calculate carbon footprint based on activities
  useEffect(() => {
    let footprint = 0;
    
    // Transport emissions (kg CO2)
    const transportEmissions = {
      private: 0.2, // per km
      public: 0.05,
      bicycle: 0,
      walking: 0
    };
    
    footprint += (transportEmissions[todayEntry.transport as keyof typeof transportEmissions] || 0.2) * todayEntry.distance;
    
    // Electricity emissions (kg CO2 per kWh)
    footprint += todayEntry.electricity * 0.82;
    
    // Food choice emissions
    const foodEmissions = {
      meat: 3.5,
      vegetarian: 1.5,
      vegan: 0.8,
      local: 1.0
    };
    
    footprint += foodEmissions[todayEntry.foodChoice as keyof typeof foodEmissions] || 1.5;
    
    setTotalFootprint(footprint);
    setTodayEntry(prev => ({ ...prev, carbonFootprint: footprint }));
  }, [todayEntry.transport, todayEntry.distance, todayEntry.electricity, todayEntry.foodChoice]);

  const completeMission = (missionId: string) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions([...completedMissions, missionId]);
    }
  };

  const getGaugeColor = (footprint: number) => {
    if (footprint <= 2) return 'text-eco-green-500';
    if (footprint <= 4) return 'text-warm-yellow-500';
    return 'text-red-500';
  };

  const getGaugeGradient = (footprint: number) => {
    if (footprint <= 2) return 'from-eco-green-400 to-eco-green-600';
    if (footprint <= 4) return 'from-warm-yellow-400 to-warm-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingDown className="h-12 w-12 text-eco-green-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">EcoMeter</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Track your daily carbon footprint and take AI-suggested actions to reduce environmental impact
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-2 border border-white/20 dark:border-gray-700/20">
            <div className="flex space-x-2">
              {[
                { id: 'tracker', label: 'Carbon Tracker', icon: TrendingDown },
                { id: 'missions', label: 'Green Missions', icon: Target },
                { id: 'insights', label: 'Insights', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
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
        {activeTab === 'tracker' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carbon Footprint Gauge */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                Today's Carbon Footprint
              </h2>
              
              {/* Animated Gauge */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="20"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${(totalFootprint / 10) * 502} 502`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className={`${getGaugeColor(totalFootprint)}`} />
                      <stop offset="100%" className={`${getGaugeColor(totalFootprint)}`} />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getGaugeColor(totalFootprint)}`}>
                      {totalFootprint.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">kg CO₂</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {totalFootprint <= 2 ? 'Excellent!' : totalFootprint <= 4 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Target vs Actual */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Target: 2.0 kg CO₂</span>
                  <span className={`text-sm font-bold ${totalFootprint <= 2 ? 'text-eco-green-600' : 'text-red-600'}`}>
                    {totalFootprint <= 2 ? 'On Track' : `+${(totalFootprint - 2).toFixed(1)}kg over`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${getGaugeGradient(totalFootprint)}`}
                    style={{ width: `${Math.min((totalFootprint / 5) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Daily Input Form */}
            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                  Log Today's Activities
                </h3>
                
                {/* Transport */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <Car className="inline h-4 w-4 mr-1" />
                    Transportation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'private', label: 'Private Car', icon: '🚗' },
                      { value: 'public', label: 'Public Transport', icon: '🚌' },
                      { value: 'bicycle', label: 'Bicycle', icon: '🚲' },
                      { value: 'walking', label: 'Walking', icon: '🚶' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTodayEntry({...todayEntry, transport: option.value})}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          todayEntry.transport === option.value
                            ? 'border-eco-green-500 bg-eco-green-50 dark:bg-eco-green-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-eco-green-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="text-xs">{option.label}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Distance (km)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={todayEntry.distance}
                      onChange={(e) => setTodayEntry({...todayEntry, distance: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      {todayEntry.distance} km
                    </div>
                  </div>
                </div>

                {/* Electricity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <Zap className="inline h-4 w-4 mr-1" />
                    Electricity Usage
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={todayEntry.electricity}
                    onChange={(e) => setTodayEntry({...todayEntry, electricity: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {todayEntry.electricity} kWh
                  </div>
                </div>

                {/* Food Choice */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <UtensilsCrossed className="inline h-4 w-4 mr-1" />
                    Food Choices
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'meat', label: 'Meat-based', icon: '🥩' },
                      { value: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
                      { value: 'vegan', label: 'Vegan', icon: '🌱' },
                      { value: 'local', label: 'Local/Seasonal', icon: '🏪' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTodayEntry({...todayEntry, foodChoice: option.value})}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          todayEntry.foodChoice === option.value
                            ? 'border-eco-green-500 bg-eco-green-50 dark:bg-eco-green-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-eco-green-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="text-xs">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Trend */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Weekly Trend
                </h3>
                <div className="flex items-end justify-between h-24 space-x-2">
                  {weeklyData.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full bg-gradient-to-t ${getGaugeGradient(value)} rounded-t transition-all duration-500`}
                        style={{ height: `${(value / 5) * 100}%` }}
                      />
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Weekly Average: <span className="font-semibold">{(weeklyData.reduce((a, b) => a + b, 0) / 7).toFixed(1)} kg CO₂</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'missions' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Daily Green Missions
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Complete these AI-suggested actions to earn EcoPoints and reduce your carbon footprint
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dailyMissions.map((mission) => {
                const isCompleted = completedMissions.includes(mission.id);
                return (
                  <div
                    key={mission.id}
                    className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 transition-all duration-300 ${
                      isCompleted ? 'bg-eco-green-50 dark:bg-eco-green-900/20 border-eco-green-200 dark:border-eco-green-700' : 'hover:scale-105'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{mission.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{mission.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{mission.description}</p>
                        </div>
                      </div>
                      {isCompleted && <CheckCircle className="h-6 w-6 text-eco-green-500" />}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-eco-green-600 dark:text-eco-green-400">
                        +{mission.points} EcoPoints
                      </div>
                      {!isCompleted ? (
                        <button
                          onClick={() => completeMission(mission.id)}
                          className="bg-eco-green-500 hover:bg-eco-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          Complete
                        </button>
                      ) : (
                        <span className="text-eco-green-600 dark:text-eco-green-400 font-medium">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Today's Progress
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">
                    {completedMissions.length}/{dailyMissions.length} missions completed
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    EcoPoints earned: {completedMissions.reduce((total, id) => {
                      const mission = dailyMissions.find(m => m.id === id);
                      return total + (mission?.points || 0);
                    }, 0)}
                  </div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${(completedMissions.length / dailyMissions.length) * 100}, 100`}
                      className="text-eco-green-500 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {Math.round((completedMissions.length / dailyMissions.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Personal Impact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
                <div className="text-3xl mb-3">🌍</div>
                <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">-23%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Carbon reduction this month</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
                <div className="text-3xl mb-3">💰</div>
                <div className="text-2xl font-bold text-deep-blue-600 dark:text-deep-blue-400">₹1,250</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Money saved on utilities</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
                <div className="text-3xl mb-3">🏆</div>
                <div className="text-2xl font-bold text-warm-yellow-600 dark:text-warm-yellow-400">#{mockUser.level}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">State ranking</div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                AI-Powered Insights
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-eco-green-50 dark:bg-eco-green-900/20 rounded-xl border border-eco-green-200 dark:border-eco-green-700">
                  <div className="flex items-center space-x-2 text-eco-green-800 dark:text-eco-green-400 mb-2">
                    <TrendingDown className="h-5 w-5" />
                    <span className="font-medium">Great Progress!</span>
                  </div>
                  <p className="text-sm text-eco-green-700 dark:text-eco-green-300">
                    Your carbon footprint has decreased by 15% since you started using public transport more frequently.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-400 mb-2">
                    <Zap className="h-5 w-5" />
                    <span className="font-medium">Energy Tip</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Consider switching to LED bulbs in your remaining fixtures. This could save you 300kg CO₂ annually.
                  </p>
                </div>

                <div className="p-4 bg-warm-yellow-50 dark:bg-warm-yellow-900/20 rounded-xl border border-warm-yellow-200 dark:border-warm-yellow-700">
                  <div className="flex items-center space-x-2 text-warm-yellow-800 dark:text-warm-yellow-400 mb-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    <span className="font-medium">Dietary Impact</span>
                  </div>
                  <p className="text-sm text-warm-yellow-700 dark:text-warm-yellow-300">
                    Your vegetarian choices this week prevented 12kg of CO₂ emissions compared to a meat-heavy diet.
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Challenge */}
            <div className="bg-gradient-to-r from-eco-green-500 to-deep-blue-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Monthly Challenge: Carbon Neutral Week</h3>
              <p className="mb-6">Try to keep your daily carbon footprint under 2kg for an entire week!</p>
              
              <div className="bg-white/20 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Progress: 4/7 days</span>
                  <span className="font-bold">57% Complete</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: '57%' }} />
                </div>
                <div className="mt-3 text-sm opacity-90">
                  Reward: 500 EcoPoints + "Carbon Neutral" badge
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
