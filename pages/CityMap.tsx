import React from 'react';
import { ChevronDown, User, Layers, Info } from 'lucide-react';

const CityMap: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-10">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold mb-1">City View</h2>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-2 mt-4">Select Target City</label>
          <div className="relative">
            <select className="w-full bg-gray-800 text-white text-sm rounded-md py-2 px-3 appearance-none cursor-pointer">
              <option>New York</option>
              <option>London</option>
              <option>Toronto</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Select a Building</h3>
            <p className="text-sm text-gray-500">
                Click on highlighted buildings in the 3D map to see who works there.
            </p>

            <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-lg text-left w-full">
                <h4 className="text-blue-800 text-xs font-bold mb-1">Pro Tip:</h4>
                <p className="text-blue-600 text-xs leading-relaxed">
                    Look for clusters in the Financial District for IB roles, or Midtown for Consulting.
                </p>
            </div>
        </div>
      </div>

      {/* Map Area Placeholder */}
      <div className="flex-1 bg-gray-100 relative">
        {/* Mock Map Background - Subtle Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Token Required Modal Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm">
           <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200 m-4">
               <div className="flex justify-center mb-6">
                 {/* Orange Logo Icon */}
                 <svg className="h-12 w-12 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M18 6H9A3 3 0 0 0 6 9V9A3 3 0 0 0 9 12H15A3 3 0 0 1 18 15V15A3 3 0 0 1 15 18H6" 
                      stroke="currentColor" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                </svg>
               </div>
               
               <h2 className="text-xl font-bold text-gray-900 mb-4">Mapbox Token Required</h2>
               <p className="text-gray-500 text-sm mb-6">
                   To view the 3D financial district, enter a public Mapbox token.
               </p>

               <input 
                type="text" 
                placeholder="pk.eyJ1..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                disabled
               />
           </div>
        </div>
      </div>
    </div>
  );
};

export default CityMap;