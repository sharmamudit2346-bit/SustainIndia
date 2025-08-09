'use client';

import { useState } from 'react';
import { Trophy, Medal, Crown, Users, MapPin, TrendingUp, Filter, Search } from 'lucide-react';
import { mockLeaderboard, mockUser } from '@/data/mockData';

type LeaderboardType = 'states' | 'cities' | 'individuals';
type SortBy = 'ecoPoints' | 'carbonReduced' | 'waterSaved' | 'treesPlanted';

export default function Leaderboard() {
  const [activeType, setActiveType] = useState<LeaderboardType>('states');
  const [sortBy, setSortBy] = useState<SortBy>('ecoPoints');
  const [searchQuery, setSearchQuery] = useState('');

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
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const filteredLeaderboard = mockLeaderboard
    .filter(state => state.state.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-eco-green-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">National Leaderboard</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compete with states, cities, and individuals across India in the ultimate sustainability challenge
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Type Selection */}
            <div className="flex space-x-2">
              {[
                { id: 'states', label: 'States', icon: MapPin },
                { id: 'cities', label: 'Cities', icon: Users },
                { id: 'individuals', label: 'Individuals', icon: Trophy }
              ].map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id as LeaderboardType)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeType === type.id
                        ? 'bg-eco-green-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-gray-700/30'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent min-w-[250px]"
              />
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              >
                <option value="ecoPoints">EcoPoints</option>
                <option value="carbonReduced">Carbon Reduced</option>
                <option value="waterSaved">Water Saved</option>
                <option value="treesPlanted">Trees Planted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Podium for Top 3 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Top Performers
          </h2>
          
          <div className="flex items-end justify-center space-x-8">
            {filteredLeaderboard.slice(0, 3).map((state, index) => {
              const positions = [1, 0, 2]; // Second, First, Third for visual arrangement
              const actualRank = state.rank;
              const height = actualRank === 1 ? 'h-48' : actualRank === 2 ? 'h-40' : 'h-32';
              
              return (
                <div
                  key={state.state}
                  className={`flex flex-col items-center ${index === 1 ? 'order-1' : index === 0 ? 'order-2' : 'order-3'}`}
                >
                  {/* Confetti for winner */}
                  {actualRank === 1 && (
                    <div className="absolute -mt-8 animate-bounce">
                      <div className="text-2xl">🎉</div>
                    </div>
                  )}
                  
                  {/* Card */}
                  <div className={`relative ${getRankStyle(actualRank)} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-64 mb-4`}>
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        {getRankIcon(actualRank)}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{state.state}</h3>
                      <div className="text-lg font-semibold mb-1">
                        {formatNumber(state[sortBy])} 
                        {sortBy === 'ecoPoints' ? ' pts' : 
                         sortBy === 'carbonReduced' ? ' kg' :
                         sortBy === 'waterSaved' ? ' L' : ' trees'}
                      </div>
                      <div className="text-sm opacity-90">
                        Population: {formatNumber(state.population)}
                      </div>
                    </div>
                    
                    {/* Rank badge */}
                    <div className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                      #{actualRank}
                    </div>
                  </div>
                  
                  {/* Podium */}
                  <div className={`${height} w-32 ${getRankStyle(actualRank)} rounded-t-xl shadow-inner`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Complete Rankings
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Showing {filteredLeaderboard.length} results
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    EcoPoints
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Carbon Reduced
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Water Saved
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trees Planted
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLeaderboard.map((state, index) => (
                  <tr 
                    key={state.state}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      state.state === mockUser.location ? 'bg-eco-green-50 dark:bg-eco-green-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          state.rank <= 3 ? getRankStyle(state.rank) : 'bg-gray-100 dark:bg-gray-600'
                        } mr-3`}>
                          <span className="text-sm font-bold">#{state.rank}</span>
                        </div>
                        {state.rank <= 3 && getRankIcon(state.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {state.state}
                            {state.state === mockUser.location && (
                              <span className="ml-2 px-2 py-1 text-xs bg-eco-green-100 text-eco-green-800 rounded-full">
                                Your State
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Pop: {formatNumber(state.population)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatNumber(state.ecoPoints)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {formatNumber(state.carbonReduced)} kg
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {formatNumber(state.waterSaved)} L
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {formatNumber(state.treesPlanted)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-eco-green-500 mr-1" />
                        <span className="text-sm text-eco-green-600 dark:text-eco-green-400 font-medium">
                          +{Math.floor(Math.random() * 15)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User's Position */}
        <div className="mt-8 bg-gradient-to-r from-eco-green-500 to-deep-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Position</h3>
              <div className="flex items-center space-x-6">
                <div>
                  <div className="text-2xl font-bold">{mockUser.name}</div>
                  <div className="text-sm opacity-90">{mockUser.location}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">#{mockUser.level}</div>
                  <div className="text-sm opacity-90">Individual Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{formatNumber(mockUser.ecoPoints)}</div>
                  <div className="text-sm opacity-90">EcoPoints</div>
                </div>
              </div>
            </div>
            <div className="text-6xl opacity-70">
              {mockUser.avatar}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
