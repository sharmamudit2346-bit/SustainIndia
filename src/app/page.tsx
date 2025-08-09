import HeroSection from '@/components/HeroSection';
import ImpactCounters from '@/components/ImpactCounters';
import IndiaMap from '@/components/IndiaMap';
import TopLeaderboard from '@/components/TopLeaderboard';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Impact Counters */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ImpactCounters />
        </div>
      </section>

      {/* India Map & Leaderboard Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/50 to-eco-green-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <IndiaMap />
            <TopLeaderboard />
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Why Choose SustainIndia?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The most comprehensive platform for environmental action in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">AI-Powered Farming</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized crop recommendations and sustainable farming practices using advanced AI technology.
              </p>
            </div>

            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Carbon Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor your daily carbon footprint and receive AI-suggested actions to reduce environmental impact.
              </p>
            </div>

            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Gamified Experience</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn EcoPoints, unlock badges, and compete with others while making a positive environmental impact.
              </p>
            </div>

            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">National Leaderboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                See how your state ranks against others and track collective progress towards sustainability goals.
              </p>
            </div>

            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Real Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Unlock certificates, discounts from eco-friendly brands, and recognition for your environmental efforts.
              </p>
            </div>

            <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Mobile-First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access all features seamlessly on any device with our responsive, PWA-enabled platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-eco-green-500 via-deep-blue-500 to-warm-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join millions of Indians working together to create a sustainable future for our nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
