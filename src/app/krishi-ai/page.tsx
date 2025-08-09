'use client';

import { useState } from 'react';
import { Sprout, Droplets, Zap, TrendingUp, Brain, MapPin, Calendar, Award } from 'lucide-react';
import { mockCropRecommendations, mockUser } from '@/data/mockData';

interface CropForm {
  crop: string;
  region: string;
  soilType: string;
  season: string;
}

export default function KrishiAI() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'simulator' | 'progress'>('recommendations');
  const [formData, setFormData] = useState<CropForm>({
    crop: 'Rice',
    region: 'Punjab',
    soilType: 'Alluvial',
    season: 'Kharif'
  });
  const [showResults, setShowResults] = useState(false);

  const handleSimulation = () => {
    setShowResults(true);
  };

  const currentRecommendation = mockCropRecommendations.find(
    r => r.crop === formData.crop && r.region === formData.region
  ) || mockCropRecommendations[0];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-eco-green-500 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">KrishiAI</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            AI-powered smart farming recommendations for sustainable agriculture across India
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-2 border border-white/20 dark:border-gray-700/20">
            <div className="flex space-x-2">
              {[
                { id: 'recommendations', label: 'AI Recommendations', icon: Brain },
                { id: 'simulator', label: 'Crop Simulator', icon: Sprout },
                { id: 'progress', label: 'My Progress', icon: TrendingUp }
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
        {activeTab === 'recommendations' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Recommendations */}
            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Smart Recommendations
                </h2>
                
                <div className="space-y-4">
                  {currentRecommendation.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-eco-green-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex-shrink-0 w-8 h-8 bg-eco-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sustainability Score */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Sustainability Score
                </h3>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Environmental Impact</span>
                    <span className="text-sm font-bold text-eco-green-600 dark:text-eco-green-400">
                      {currentRecommendation.sustainability}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-eco-green-400 to-eco-green-600 transition-all duration-1000 ease-out rounded-full relative"
                      style={{ width: `${currentRecommendation.sustainability}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                    </div>
                  </div>
                </div>

                {currentRecommendation.sustainability >= 80 && (
                  <div className="mt-4 p-3 bg-eco-green-100 dark:bg-eco-green-900/20 rounded-lg border border-eco-green-200 dark:border-eco-green-700">
                    <div className="flex items-center space-x-2 text-eco-green-800 dark:text-eco-green-400">
                      <Award className="h-5 w-5" />
                      <span className="font-medium">Excellent sustainability practices!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Crop Details */}
            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                  Crop Requirements
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {currentRecommendation.waterRequirement}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">mm/season</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <Sprout className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {currentRecommendation.expectedYield}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">tonnes/hectare</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Nutrient Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Nitrogen (N)</span>
                      <span className="font-medium">{currentRecommendation.nutrientRequirement.nitrogen} kg/ha</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Phosphorus (P)</span>
                      <span className="font-medium">{currentRecommendation.nutrientRequirement.phosphorus} kg/ha</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Potassium (K)</span>
                      <span className="font-medium">{currentRecommendation.nutrientRequirement.potassium} kg/ha</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Integration */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                  Weather Insights
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">☀️</span>
                      <span className="font-medium">Today</span>
                    </div>
                    <span className="text-lg font-bold">28°C</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🌧️</span>
                      <span className="font-medium">Rainfall Expected</span>
                    </div>
                    <span className="text-lg font-bold">15mm</span>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                      <Zap className="h-5 w-5" />
                      <span className="font-medium">AI Tip: Perfect conditions for irrigation today!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                Crop Optimization Simulator
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Region
                    </label>
                    <select 
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    >
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Sprout className="inline h-4 w-4 mr-1" />
                      Crop Type
                    </label>
                    <select 
                      value={formData.crop}
                      onChange={(e) => setFormData({...formData, crop: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    >
                      <option value="Rice">Rice</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Sugarcane">Sugarcane</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Soil Type
                    </label>
                    <select 
                      value={formData.soilType}
                      onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    >
                      <option value="Alluvial">Alluvial</option>
                      <option value="Loamy">Loamy</option>
                      <option value="Clay">Clay</option>
                      <option value="Sandy">Sandy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Season
                    </label>
                    <select 
                      value={formData.season}
                      onChange={(e) => setFormData({...formData, season: e.target.value})}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    >
                      <option value="Kharif">Kharif (Monsoon)</option>
                      <option value="Rabi">Rabi (Winter)</option>
                      <option value="Zaid">Zaid (Summer)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSimulation}
                    className="w-full bg-gradient-to-r from-eco-green-500 to-eco-green-600 hover:from-eco-green-600 hover:to-eco-green-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Generate AI Recommendations
                  </button>
                </div>

                {/* Results */}
                <div className={`transition-all duration-500 ${showResults ? 'opacity-100' : 'opacity-50'}`}>
                  {showResults && (
                    <div className="space-y-4">
                      <div className="p-4 bg-eco-green-50 dark:bg-eco-green-900/20 rounded-xl border border-eco-green-200 dark:border-eco-green-700">
                        <h4 className="font-semibold text-eco-green-800 dark:text-eco-green-400 mb-2">
                          Optimization Results
                        </h4>
                        <div className="text-sm text-eco-green-700 dark:text-eco-green-300">
                          Water usage: <span className="font-bold">-30% reduction</span><br/>
                          Fertilizer efficiency: <span className="font-bold">+25% improvement</span><br/>
                          Expected yield: <span className="font-bold">{currentRecommendation.expectedYield} t/ha</span>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                          EcoPoints Earned
                        </h4>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">+150</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">For implementing sustainable practices</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Personal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
                <Droplets className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mockUser.waterSaved}L</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Water Saved</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
                <TrendingUp className="h-12 w-12 text-eco-green-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">{mockUser.ecoPoints}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">EcoPoints Earned</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center">
                <Calendar className="h-12 w-12 text-warm-yellow-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-warm-yellow-600 dark:text-warm-yellow-400">{mockUser.streak}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Recent Achievements</h3>
              <div className="space-y-4">
                {mockUser.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      <div className="mt-2 w-48 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-eco-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-eco-green-600 dark:text-eco-green-400">
                        +{achievement.reward}
                      </div>
                      <div className="text-sm text-gray-500">EcoPoints</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
