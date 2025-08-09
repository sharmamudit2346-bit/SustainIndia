'use client';

import { useState, useEffect } from 'react';
import { Calendar, Target, Users, Clock, Trophy, Zap, Droplets, Leaf, Timer } from 'lucide-react';
import { mockChallenges, nationalImpact } from '@/data/mockData';

export default function Challenges() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const activeChallenge = mockChallenges.find(c => c.status === 'active');

  useEffect(() => {
    if (!activeChallenge) return;

    const updateTimer = () => {
      const endDate = new Date(activeChallenge.endDate).getTime();
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeChallenge]);

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'water': return <Droplets className="h-8 w-8" />;
      case 'carbon': return <Leaf className="h-8 w-8" />;
      case 'agriculture': return <Zap className="h-8 w-8" />;
      case 'waste': return <Target className="h-8 w-8" />;
      default: return <Target className="h-8 w-8" />;
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'water': return 'from-blue-500 to-blue-600';
      case 'carbon': return 'from-eco-green-500 to-eco-green-600';
      case 'agriculture': return 'from-warm-yellow-500 to-warm-yellow-600';
      case 'waste': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-12 w-12 text-eco-green-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Seasonal Challenges</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join nationwide environmental challenges and make a collective impact across India
          </p>
        </div>

        {/* Active Challenge Hero */}
        {activeChallenge && (
          <div className={`relative overflow-hidden bg-gradient-to-br ${getChallengeColor(activeChallenge.type)} rounded-3xl p-8 md:p-12 mb-12 text-white`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Challenge Info */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      {getChallengeIcon(activeChallenge.type)}
                    </div>
                    <div>
                      <div className="text-sm opacity-90">ACTIVE CHALLENGE</div>
                      <h2 className="text-3xl md:text-4xl font-bold">{activeChallenge.title}</h2>
                    </div>
                  </div>
                  
                  <p className="text-xl opacity-90 mb-6">{activeChallenge.description}</p>
                  
                  {/* Countdown Timer */}
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="text-center bg-white/20 rounded-xl p-4">
                        <div className="text-2xl md:text-3xl font-bold">{value}</div>
                        <div className="text-sm opacity-80 capitalize">{unit}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>{activeChallenge.participants.toLocaleString()} participants</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5" />
                      <span>+{activeChallenge.reward} EcoPoints</span>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">National Progress</h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span>Progress</span>
                      <span className="font-bold">
                        {((activeChallenge.progress / activeChallenge.target) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-1000 ease-out rounded-full relative"
                        style={{ width: `${Math.min((activeChallenge.progress / activeChallenge.target) * 100, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">
                        {(activeChallenge.progress / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm opacity-80">Achieved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {(activeChallenge.target / 1000000).toFixed(0)}M
                      </div>
                      <div className="text-sm opacity-80">Target</div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    Join Challenge
                  </button>
                </div>
              </div>

              {/* Floating Achievement Icons */}
              <div className="absolute top-8 right-8 space-y-4 hidden lg:block">
                <div className="text-2xl animate-float">💧</div>
                <div className="text-2xl animate-float" style={{ animationDelay: '1s' }}>🌱</div>
                <div className="text-2xl animate-float" style={{ animationDelay: '2s' }}>🏆</div>
              </div>
            </div>
          </div>
        )}

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                challenge.status === 'active' ? 'ring-2 ring-eco-green-400' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${getChallengeColor(challenge.type)} text-white`}>
                  {getChallengeIcon(challenge.type)}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  challenge.status === 'active' ? 'bg-eco-green-100 text-eco-green-800' :
                  challenge.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {challenge.status.toUpperCase()}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {challenge.description}
              </p>
              
              {challenge.status === 'active' && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-xs font-medium">
                      {((challenge.progress / challenge.target) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${getChallengeColor(challenge.type)}`}
                      style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {challenge.participants.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-eco-green-500" />
                    <span className="text-eco-green-600 dark:text-eco-green-400 font-medium">
                      +{challenge.reward}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(challenge.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Challenge Leaderboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Performers */}
            {[
              { name: 'Priya Sharma', state: 'Maharashtra', points: 2450, rank: 1, avatar: '👩‍🌾' },
              { name: 'Raj Kumar', state: 'Punjab', points: 2380, rank: 2, avatar: '👨‍💼' },
              { name: 'Anita Singh', state: 'Tamil Nadu', points: 2320, rank: 3, avatar: '👩‍💻' }
            ].map((user) => (
              <div
                key={user.rank}
                className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                  user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                  user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                  'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{user.avatar}</div>
                  <div className="text-lg font-bold mb-1">{user.name}</div>
                  <div className="text-sm opacity-90 mb-3">{user.state}</div>
                  <div className="text-2xl font-bold">{user.points}</div>
                  <div className="text-sm opacity-80">EcoPoints</div>
                  
                  <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.rank === 1 ? 'bg-white text-yellow-600' :
                    user.rank === 2 ? 'bg-white text-gray-600' :
                    'bg-white text-orange-600'
                  }`}>
                    #{user.rank}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
            <div className="text-3xl mb-2">💧</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {(nationalImpact.waterSaved / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Liters Saved</div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
            <div className="text-3xl mb-2">🌱</div>
            <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">
              {(nationalImpact.carbonReduced / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Reduced (kg)</div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
            <div className="text-3xl mb-2">🌳</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {(nationalImpact.treesPlanted / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Trees Planted</div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-warm-yellow-600 dark:text-warm-yellow-400">
              {(nationalImpact.usersActive / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}
