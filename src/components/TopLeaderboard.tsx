'use client';

import { Trophy, Crown, Medal, TrendingUp } from 'lucide-react';
import { mockLeaderboard } from '@/data/mockData';
import Link from 'next/link';

export default function TopLeaderboard() {
  const topStates = mockLeaderboard.slice(0, 3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-600" />;
      default:
        return <Trophy className="h-6 w-6 text-gray-500" />;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600 text-white transform scale-105';
      case 2:
        return 'from-gray-300 to-gray-500 text-white transform scale-100';
      case 3:
        return 'from-orange-400 to-orange-600 text-white transform scale-95';
      default:
        return 'from-gray-200 to-gray-400 text-gray-700';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Top Performing States
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Leading the way in sustainable practices across India
        </p>
      </div>

      {/* Podium Style Layout */}
      <div className="flex items-end justify-center space-x-4 mb-8">
        {/* Second Place */}
        {topStates[1] && (
          <div className="flex flex-col items-center">
            <div className={`relative bg-gradient-to-br ${getRankStyle(2)} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-48`}>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {getRankIcon(2)}
                </div>
                <h3 className="text-lg font-bold">{topStates[1].state}</h3>
                <p className="text-sm opacity-90">{topStates[1].ecoPoints.toLocaleString()} pts</p>
              </div>
            </div>
            <div className="w-32 h-20 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg mt-2 shadow-inner"></div>
          </div>
        )}

        {/* First Place */}
        {topStates[0] && (
          <div className="flex flex-col items-center relative">
            {/* Confetti Animation */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="animate-bounce">🎉</div>
            </div>
            
            <div className={`relative bg-gradient-to-br ${getRankStyle(1)} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 w-56 z-10`}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getRankIcon(1)}
                </div>
                <h3 className="text-xl font-bold">{topStates[0].state}</h3>
                <p className="text-sm opacity-90 mb-2">{topStates[0].ecoPoints.toLocaleString()} pts</p>
                <div className="text-xs opacity-80">
                  🌱 {topStates[0].carbonReduced.toLocaleString()}kg CO₂
                </div>
              </div>
              
              {/* Winner badge */}
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                👑
              </div>
            </div>
            <div className="w-36 h-28 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg mt-2 shadow-inner"></div>
          </div>
        )}

        {/* Third Place */}
        {topStates[2] && (
          <div className="flex flex-col items-center">
            <div className={`relative bg-gradient-to-br ${getRankStyle(3)} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-48`}>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {getRankIcon(3)}
                </div>
                <h3 className="text-lg font-bold">{topStates[2].state}</h3>
                <p className="text-sm opacity-90">{topStates[2].ecoPoints.toLocaleString()} pts</p>
              </div>
            </div>
            <div className="w-32 h-16 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t-lg mt-2 shadow-inner"></div>
          </div>
        )}
      </div>

      {/* Additional States */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
        <div className="space-y-3">
          {mockLeaderboard.slice(3, 6).map((state, index) => (
            <div
              key={state.state}
              className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-700/30 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300">
                  #{state.rank}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{state.state}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{state.ecoPoints.toLocaleString()} EcoPoints</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                  <div>💧 {(state.waterSaved / 1000).toFixed(0)}K L</div>
                  <div>🌳 {(state.treesPlanted / 1000).toFixed(1)}K trees</div>
                </div>
                <TrendingUp className="h-4 w-4 text-eco-green-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* View Full Leaderboard */}
        <div className="mt-6 text-center">
          <Link
            href="/leaderboard"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-eco-green-500 to-deep-blue-500 hover:from-eco-green-600 hover:to-deep-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Trophy className="h-5 w-5" />
            <span>View Full Leaderboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
