
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-10 pb-10 sm:px-6 lg:px-8 overflow-hidden">
        <h1 className="text-[18vw] font-bold tracking-tighter text-gray-200 mb-0 leading-[0.8] whitespace-nowrap">
          Networking
        </h1>
        <h1 className="text-[18vw] font-bold tracking-tighter text-black mb-8 leading-[0.8] whitespace-nowrap">
          done better.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light">
          Skip the cold emails: Real conversations, Real advice, Real offers.
        </p>
        <div className="flex gap-4">
          <Link to="/mentors" className="bg-blue-800 text-white px-8 py-3 rounded-full font-medium flex items-center hover:bg-blue-900 transition-colors">
            Find Mentors <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Value Props */}
      <div className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Card 1 */}
            <div className="p-8 border border-blue-600 rounded-3xl shadow-[0_0_0_1px_rgba(37,99,235,1)] flex flex-col h-full bg-white relative overflow-hidden group hover:shadow-lg transition-shadow">
               <div className="absolute top-0 right-0 w-2 h-full bg-blue-700 rounded-r-3xl"></div>
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-white mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Network</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with verified <span className="text-blue-600 font-medium">business students</span> who secured your dream offers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 border border-green-500 rounded-3xl shadow-[0_0_0_1px_rgba(22,163,74,1)] flex flex-col h-full bg-white relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 w-2 h-full bg-green-500 rounded-r-3xl"></div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">All The Prep You Need</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get the technical and behavioral answers that you need for your next <span className="text-green-600 font-medium">IB, Consulting, VC, PE, Quant, Asset Management...</span> interview.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
