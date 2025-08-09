'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, TrendingUp } from 'lucide-react';
import { sustainabilityQuotes } from '@/data/mockData';
import Link from 'next/link';

export default function HeroSection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote(prev => (prev + 1) % sustainabilityQuotes.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-eco-green-50 via-blue-50 to-warm-yellow-50 dark:from-gray-900 dark:via-deep-blue-900 dark:to-eco-green-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDM0LCAxOTcsIDk0LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float">🌱</div>
        <div className="absolute top-40 right-20 text-4xl animate-float" style={{ animationDelay: '1s' }}>💧</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-float" style={{ animationDelay: '2s' }}>🌳</div>
        <div className="absolute bottom-20 right-40 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>♻️</div>
        <div className="absolute top-60 left-1/3 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>☀️</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="space-y-6 animate-slide-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
            <span className="block text-gray-800 dark:text-gray-100 mb-4">Save the</span>
            <span className="block gradient-text">Planet</span>
            <span className="block text-gray-700 dark:text-gray-200 text-4xl md:text-5xl lg:text-6xl mt-4">
              Level Up Your Country
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join India's most engaging sustainability challenge platform. 
            <span className="font-semibold text-eco-green-600 dark:text-eco-green-400"> Track your impact</span>, 
            <span className="font-semibold text-deep-blue-600 dark:text-deep-blue-400"> compete with others</span>, and 
            <span className="font-semibold text-warm-yellow-600 dark:text-warm-yellow-400"> earn rewards</span> while making a difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link 
              href="/profile" 
              className="group relative overflow-hidden bg-gradient-to-r from-eco-green-500 to-eco-green-600 hover:from-eco-green-600 hover:to-eco-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow"
            >
              <span className="relative z-10 flex items-center">
                Join the Mission
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-eco-green-600 to-eco-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>

            <button className="group flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-full font-medium hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-eco-green-600 dark:text-eco-green-400">1.2M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-deep-blue-600 dark:text-deep-blue-400">28</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">States</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-warm-yellow-600 dark:text-warm-yellow-400">45M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Liters Saved</div>
            </div>
          </div>

          {/* Rotating Quote */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
              <blockquote className="text-lg md:text-xl italic text-gray-600 dark:text-gray-300 mb-4">
                "{sustainabilityQuotes[currentQuote]}"
              </blockquote>
              <div className="flex justify-center space-x-1">
                {sustainabilityQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuote 
                        ? 'bg-eco-green-500 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-eco-green-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-eco-green-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
