import React from 'react';
import { MENTORS } from '../constants';
import { Mentor } from '../types';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, FileText, Building, GraduationCap } from 'lucide-react';

const MyMentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
            <img src={mentor.imageUrl} alt={mentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl text-gray-900">{mentor.name}</h3>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-full">Connected</span>
              </div>
              <p className="text-sm text-gray-500 font-medium">{mentor.role}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5" /> {mentor.company}
                  </div>
                  <div className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5" /> {mentor.school}
                  </div>
              </div>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                <MessageSquare className="h-4 w-4" /> Text
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Phone className="h-4 w-4" /> Call
            </button>
             <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <FileText className="h-4 w-4" /> Resume
            </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mentor Bio</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
                {mentor.description}
            </p>
        </div>
      </div>
    </div>
  );
};

const MyStreets: React.FC = () => {
  // Empty array for clean state
  const myMentors: Mentor[] = [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Streets</h1>
            <p className="text-gray-500 mt-2">Your network of mentors. Access resumes, get advice, and chat.</p>
          </div>
          <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Manage Connections
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myMentors.map((mentor) => (
          <MyMentorCard key={mentor.id} mentor={mentor} />
        ))}
         
         {/* Placeholder for empty state */}
        <Link to="/mentors" className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center hover:border-gray-300 hover:bg-gray-50 transition-all group cursor-pointer h-full min-h-[300px]">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                <span className="text-2xl text-gray-400 font-light">+</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Expand Your Network</h3>
            <p className="text-sm text-gray-500">Find more mentors to connect with.</p>
        </Link>
      </div>
    </div>
  );
};

export default MyStreets;