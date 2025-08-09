'use client';

import { useState, useEffect } from 'react';
import { Droplets, TreePine, Zap, Users } from 'lucide-react';
import { nationalImpact } from '@/data/mockData';

interface CounterProps {
  value: number;
  target: number;
  label: string;
  icon: React.ReactNode;
  unit: string;
  color: string;
}

function AnimatedCounter({ value, target }: { value: number; target: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const increment = value / 100;
    const timer = setInterval(() => {
      setCurrent(prev => {
        if (prev >= value) {
          clearInterval(timer);
          return value;
        }
        return Math.min(prev + increment, value);
      });
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {Math.floor(current).toLocaleString()}
    </span>
  );
}

function ImpactCard({ value, target, label, icon, unit, color }: CounterProps) {
  const progress = (value / target) * 100;

  return (
    <div className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-2xl`}></div>
      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300 group counter-glow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="text-right">
            <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              <AnimatedCounter value={value} target={target} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{unit}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {progress.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out rounded-full relative`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Target: {target.toLocaleString()} {unit}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImpactCounters() {
  const counters = [
    {
      value: nationalImpact.waterSaved,
      target: 50000000,
      label: 'Water Saved',
      icon: <Droplets className="h-6 w-6" />,
      unit: 'Liters',
      color: 'from-blue-500 to-blue-600',
    },
    {
      value: nationalImpact.carbonReduced,
      target: 500000,
      label: 'CO₂ Reduced',
      icon: <Zap className="h-6 w-6" />,
      unit: 'Kg',
      color: 'from-eco-green-500 to-eco-green-600',
    },
    {
      value: nationalImpact.treesPlanted,
      target: 1000000,
      label: 'Trees Planted',
      icon: <TreePine className="h-6 w-6" />,
      unit: 'Trees',
      color: 'from-green-600 to-green-700',
    },
    {
      value: nationalImpact.usersActive,
      target: 2000000,
      label: 'Active Users',
      icon: <Users className="h-6 w-6" />,
      unit: 'People',
      color: 'from-warm-yellow-500 to-warm-yellow-600',
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          National Impact
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Real-time tracking of our collective environmental impact across India
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {counters.map((counter, index) => (
          <div key={counter.label} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-up">
            <ImpactCard {...counter} />
          </div>
        ))}
      </div>
      
      {/* Additional stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
          <div className="text-2xl font-bold text-eco-green-600 dark:text-eco-green-400">
            {nationalImpact.statesParticipating}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">States Participating</div>
        </div>
        
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-white/20 dark:border-gray-700/20">
          <div className="text-2xl font-bold text-deep-blue-600 dark:text-deep-blue-400">
            {nationalImpact.challengesCompleted}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Challenges Completed</div>
        </div>
        
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-white/20 dark:border-gray-700/20 col-span-2 md:col-span-1">
          <div className="text-2xl font-bold text-warm-yellow-600 dark:text-warm-yellow-400">
            ₹2.4Cr
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Economic Impact</div>
        </div>
      </div>
    </div>
  );
}
