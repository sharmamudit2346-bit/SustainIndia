'use client';

import { useState, useEffect } from 'react';
import { mockLeaderboard } from '@/data/mockData';

interface State {
  name: string;
  code: string;
  rank: number;
  ecoPoints: number;
  path: string;
}

const indiaStates: State[] = [
  { name: 'Maharashtra', code: 'MH', rank: 1, ecoPoints: 2456780, path: 'M 500 400 L 480 380 L 460 400 L 480 420 Z' },
  { name: 'Tamil Nadu', code: 'TN', rank: 2, ecoPoints: 2234560, path: 'M 520 480 L 500 460 L 480 480 L 500 500 Z' },
  { name: 'Karnataka', code: 'KA', rank: 3, ecoPoints: 2098750, path: 'M 480 440 L 460 420 L 440 440 L 460 460 Z' },
  { name: 'Gujarat', code: 'GJ', rank: 4, ecoPoints: 1987650, path: 'M 420 360 L 400 340 L 380 360 L 400 380 Z' },
  { name: 'Uttar Pradesh', code: 'UP', rank: 5, ecoPoints: 1876540, path: 'M 480 320 L 460 300 L 440 320 L 460 340 Z' },
];

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [glowAnimation, setGlowAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAnimation(prev => (prev + 1) % indiaStates.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStateColor = (rank: number) => {
    switch (rank) {
      case 1: return '#22c55e'; // Green for top rank
      case 2: return '#3b82f6'; // Blue for second
      case 3: return '#eab308'; // Yellow for third
      default: return '#6b7280'; // Gray for others
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative bg-gradient-to-br from-eco-green-50 to-deep-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 glass-effect">
        <h3 className="text-2xl font-bold text-center mb-6 gradient-text">Live State Rankings</h3>
        
        {/* Simplified India Map */}
        <svg
          viewBox="0 0 800 600"
          className="w-full h-64 drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))' }}
        >
          {/* India outline (simplified) */}
          <path
            d="M 200 100 
               C 250 80, 350 90, 400 120
               C 450 100, 550 110, 600 150
               C 620 200, 610 250, 580 300
               C 600 350, 590 400, 560 450
               C 540 500, 480 520, 420 510
               C 380 530, 340 520, 300 500
               C 260 480, 230 450, 210 400
               C 180 350, 190 300, 200 250
               C 190 200, 195 150, 200 100 Z"
            fill="rgba(34, 197, 94, 0.1)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="2"
            className="animate-pulse-glow"
          />

          {/* State markers */}
          {indiaStates.map((state, index) => (
            <g key={state.code}>
              {/* Pulsing ring for top states */}
              {state.rank <= 3 && (
                <circle
                  cx={300 + index * 80}
                  cy={200 + index * 60}
                  r="20"
                  fill="none"
                  stroke={getStateColor(state.rank)}
                  strokeWidth="2"
                  opacity="0.6"
                  className={glowAnimation === index ? "pulse-ring" : ""}
                />
              )}
              
              {/* State dot */}
              <circle
                cx={300 + index * 80}
                cy={200 + index * 60}
                r="12"
                fill={getStateColor(state.rank)}
                className={`cursor-pointer transition-all duration-300 hover:scale-125 ${
                  hoveredState === state.code ? 'scale-125' : ''
                }`}
                onMouseEnter={() => setHoveredState(state.code)}
                onMouseLeave={() => setHoveredState(null)}
              />
              
              {/* State label */}
              <text
                x={300 + index * 80}
                y={240 + index * 60}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-700 dark:fill-gray-300"
              >
                {state.code}
              </text>
              
              {/* Rank badge */}
              <circle
                cx={315 + index * 80}
                cy={185 + index * 60}
                r="8"
                fill="white"
                stroke={getStateColor(state.rank)}
                strokeWidth="2"
              />
              <text
                x={315 + index * 80}
                y={190 + index * 60}
                textAnchor="middle"
                className="text-xs font-bold fill-gray-800"
              >
                {state.rank}
              </text>
            </g>
          ))}
          
          {/* Animated elements */}
          <g className="animate-float">
            <circle cx="350" cy="150" r="3" fill="#22c55e" opacity="0.8" />
            <circle cx="450" cy="250" r="2" fill="#3b82f6" opacity="0.6" />
            <circle cx="380" cy="300" r="2.5" fill="#eab308" opacity="0.7" />
          </g>
        </svg>

        {/* State info tooltip */}
        {hoveredState && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-eco-green-200 dark:border-gray-600 animate-fade-in">
            {indiaStates
              .filter(state => state.code === hoveredState)
              .map(state => (
                <div key={state.code} className="text-sm">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{state.name}</div>
                  <div className="text-eco-green-600 dark:text-eco-green-400">Rank #{state.rank}</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {state.ecoPoints.toLocaleString()} EcoPoints
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-eco-green-500"></div>
            <span className="text-gray-600 dark:text-gray-300">Rank 1</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-deep-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-300">Rank 2</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warm-yellow-500"></div>
            <span className="text-gray-600 dark:text-gray-300">Rank 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
