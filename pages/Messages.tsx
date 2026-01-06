
import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, MessageSquare } from 'lucide-react';
import { MENTORS } from '../constants';

const Messages: React.FC = () => {
  // Safe default for active chat mock
  const [activeChatId, setActiveChatId] = useState(MENTORS.length > 0 ? MENTORS[0].id : null);
  const activeMentor = MENTORS.find(m => m.id === activeChatId);

  if (MENTORS.length === 0) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-sm">
          <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm border border-gray-200">
            <MessageSquare className="h-10 w-10 text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No messages yet</h2>
          <p className="text-gray-500 mb-6">Connect with a mentor to start a conversation about your career goals.</p>
          <a href="#/mentors" className="bg-black text-white px-6 py-2.5 rounded-full font-medium inline-block hover:bg-gray-800 transition-colors">
            Browse Mentors
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white">
      {/* Chat Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search conversations"
              className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {MENTORS.slice(0, 4).map((mentor) => (
            <div 
                key={mentor.id} 
                onClick={() => setActiveChatId(mentor.id)}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 ${activeChatId === mentor.id ? 'bg-orange-50 border-r-2 border-orange-500' : ''}`}
            >
              <div className="relative">
                <img src={mentor.imageUrl} alt={mentor.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{mentor.name}</h3>
                  <span className="text-xs text-gray-500">10:42 AM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                    {mentor.id === activeChatId ? "Sounds good, let's meet then." : "Hey! Thanks for connecting."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeMentor ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <img src={activeMentor.imageUrl} alt={activeMentor.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h3 className="font-bold text-gray-900">{activeMentor.name}</h3>
                        <p className="text-xs text-gray-500">{activeMentor.role}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-gray-600"><Phone className="h-5 w-5" /></button>
                    <button className="hover:text-gray-600"><Video className="h-5 w-5" /></button>
                    <button className="hover:text-gray-600"><MoreVertical className="h-5 w-5" /></button>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto space-y-4">
                <div className="flex justify-center mb-6">
                    <span className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-full">Today, Oct 24</span>
                </div>

                <div className="flex gap-3 justify-end">
                    <div className="bg-black text-white p-3 rounded-2xl rounded-tr-none max-w-md text-sm">
                        Hi {activeMentor.name.split(' ')[0]}! I'd love to schedule a session to discuss your time at {activeMentor.company}.
                    </div>
                </div>

                <div className="flex gap-3">
                    <img src={activeMentor.imageUrl} alt={activeMentor.name} className="w-8 h-8 rounded-full object-cover self-end" />
                    <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-md text-sm shadow-sm">
                        Hey! Happy to help. I have some availability this Thursday evening. Does that work for you?
                    </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                    <div className="bg-black text-white p-3 rounded-2xl rounded-tr-none max-w-md text-sm">
                        Yes, Thursday works perfectly.
                    </div>
                </div>

                <div className="flex gap-3">
                    <img src={activeMentor.imageUrl} alt={activeMentor.name} className="w-8 h-8 rounded-full object-cover self-end" />
                    <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-md text-sm shadow-sm">
                        Sounds good, let's meet then.
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-3">
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
