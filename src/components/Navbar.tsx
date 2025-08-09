'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { 
  Leaf, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sprout, 
  TrendingUp, 
  Trophy, 
  Gift,
  Calendar,
  User
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/', label: 'Home', icon: Leaf },
    { href: '/krishi-ai', label: 'KrishiAI', icon: Sprout },
    { href: '/eco-meter', label: 'EcoMeter', icon: TrendingUp },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/rewards', label: 'Rewards', icon: Gift },
    { href: '/challenges', label: 'Challenges', icon: Calendar },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-eco-green-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Leaf className="h-8 w-8 text-eco-green-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 h-8 w-8 text-eco-green-400 animate-ping opacity-20" />
            </div>
            <span className="text-xl font-bold gradient-text font-poppins">SustainIndia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-eco-green-600 dark:hover:text-eco-green-400 hover:bg-eco-green-50 dark:hover:bg-gray-800 transition-all duration-300 group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-eco-green-100 dark:bg-gray-800 text-eco-green-600 dark:text-eco-green-400 hover:bg-eco-green-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-eco-green-50 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-eco-green-200 dark:border-gray-700 animate-slide-up">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:text-eco-green-600 dark:hover:text-eco-green-400 hover:bg-eco-green-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
