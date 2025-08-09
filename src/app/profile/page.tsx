'use client';

import { useState } from 'react';
import { User, Settings, Share2, Edit3, Camera, MapPin, Calendar, Trophy, TrendingUp, Zap } from 'lucide-react';
import { mockUser, mockBadges } from '@/data/mockData';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);

  const calculateLevelProgress = () => {
    const currentLevelXP = userData.level * 1000;
    const nextLevelXP = (userData.level + 1) * 1000;
    const progress = ((userData.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const getStreakMessage = () => {
    if (userData.streak >= 30) return "🔥 Legendary Streak!";
    if (userData.streak >= 14) return "💪 Strong Streak!";
    if (userData.streak >= 7) return "⭐ Good Streak!";
    return "🌱 Keep Going!";
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-eco-green-500 via-deep-blue-500 to-warm-yellow-500 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-6xl backdrop-blur-lg border-4 border-white/30">
                  {userData.avatar}
                </div>
                <button className="absolute bottom-2 right-2 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{userData.name}</h1>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors duration-300"
                  >
                    <Edit3 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                  <MapPin className="h-5 w-5 opacity-80" />
                  <span className="text-lg opacity-90">{userData.location}</span>
                </div>

                {/* Level & XP */}
                <div className="mb-6">
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                    <span className="text-xl font-semibold">Level {userData.level}</span>
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-sm">#{userData.level} in {userData.location}</span>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-80 bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${calculateLevelProgress()}%` }}
                    />
                  </div>
                  <div className="text-sm opacity-80 mt-1">
                    {userData.xp} / {(userData.level + 1) * 1000} XP
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userData.ecoPoints.toLocaleString()}</div>
                    <div className="text-sm opacity-80">EcoPoints</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userData.streak}</div>
                    <div className="text-sm opacity-80">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userData.badges.length}</div>
                    <div className="text-sm opacity-80">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userData.treesPlanted}</div>
                    <div className="text-sm opacity-80">Trees</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                <button className="bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share Profile</span>
                </button>
                <button className="bg-white/20 backdrop-blur-lg px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-8 right-8 space-y-4 hidden lg:block">
            <div className="text-2xl animate-float">🏆</div>
            <div className="text-2xl animate-float" style={{ animationDelay: '1s' }}>🌱</div>
            <div className="text-2xl animate-float" style={{ animationDelay: '2s' }}>⭐</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Environmental Impact */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Environmental Impact
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-4xl mb-3">💧</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {userData.waterSaved}L
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Water Saved</div>
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    +23% this month
                  </div>
                </div>
                
                <div className="text-center p-6 bg-eco-green-50 dark:bg-eco-green-900/20 rounded-xl">
                  <div className="text-4xl mb-3">🌱</div>
                  <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">
                    {userData.carbonFootprint}kg
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Reduced</div>
                  <div className="mt-2 text-xs text-eco-green-600 dark:text-eco-green-400">
                    -15% vs average
                  </div>
                </div>
                
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-4xl mb-3">🌳</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {userData.treesPlanted}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Trees Planted</div>
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    Goal: 20 trees
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {[
                  { action: 'Completed Water Conservation Challenge', points: 150, time: '2 hours ago', icon: '💧' },
                  { action: 'Used public transport for commute', points: 50, time: '1 day ago', icon: '🚌' },
                  { action: 'Planted a tree in community garden', points: 100, time: '3 days ago', icon: '🌳' },
                  { action: 'Shared eco-friendly tip', points: 25, time: '1 week ago', icon: '💡' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{activity.icon}</div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          {activity.action}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-eco-green-600 dark:text-eco-green-400 font-semibold">
                      +{activity.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Streak Counter */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <div className="text-center">
                <div className="text-4xl mb-3">🔥</div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {userData.streak} Days
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {getStreakMessage()}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userData.streak / 30) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Next milestone: 30 days
                </div>
              </div>
            </div>

            {/* Badge Collection */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Recent Badges
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {userData.badges.slice(0, 6).map((badge) => (
                  <div
                    key={badge.id}
                    className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-eco-green-600 dark:text-eco-green-400 font-medium hover:underline">
                View All Badges
              </button>
            </div>

            {/* Monthly Goals */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Monthly Goals
              </h3>
              
              <div className="space-y-4">
                {[
                  { goal: 'Save 2000L Water', progress: 1250, target: 2000, icon: '💧' },
                  { goal: 'Reduce 5kg CO₂', progress: 2.4, target: 5, icon: '🌱' },
                  { goal: 'Plant 5 Trees', progress: 3, target: 5, icon: '🌳' },
                ].map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{goal.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {goal.goal}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {goal.progress}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-eco-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="w-full bg-eco-green-500 hover:bg-eco-green-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Log Today's Impact</span>
                </button>
                
                <button className="w-full bg-deep-blue-500 hover:bg-deep-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Join Challenge</span>
                </button>
                
                <button className="w-full bg-warm-yellow-500 hover:bg-warm-yellow-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
