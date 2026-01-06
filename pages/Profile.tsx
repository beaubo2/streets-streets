
import React, { useState } from 'react';
import { User, Mail, School, Building, CreditCard, Upload, Send, CheckCircle2, ShieldAlert, LogOut, Users, Calendar, FileText, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mentee } from '../types';

// Clear mock data
const MOCK_MENTEES: Mentee[] = [];

const Profile: React.FC = () => {
  const { user, logout, verifyMentor, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  // Mentor Specific State
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'bio' | 'mentees' | 'resources' | 'settings'>('bio');
  const [meetingEmail, setMeetingEmail] = useState(user?.email || '');

  // If not logged in, show simple redirect (or in a real app, protect the route)
  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
            <button 
                onClick={() => navigate('/login')}
                className="bg-black text-white px-6 py-2 rounded-full font-medium"
            >
                Go to Login
            </button>
        </div>
    );
  }

  const handleLogout = () => {
      logout();
      navigate('/');
  };

  const handleVerification = () => {
      // Simulate verification
      if (verificationCode === '1234') {
          verifyMentor();
          setShowVerificationInput(false);
          alert("Email Verified Successfully!");
      } else {
          alert("Invalid code. Try 1234 (demo).");
      }
  };

  const sendCode = () => {
      setShowVerificationInput(true);
      alert(`Verification code sent to ${user.schoolEmail || user.email}`);
  };

  const isMentor = user.type === 'mentor';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Profile Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My Profile</h1>
          <p className="text-gray-500 mt-2 font-medium">
            {isMentor 
              ? 'Manage your professional presence, mentor bio, and track your student connections.' 
              : 'Keep your information up to date to find the best mentorship matches for your career.'}
          </p>
        </div>
        <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all text-sm font-bold shadow-sm self-start md:self-end"
        >
            <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 relative group cursor-pointer hover:border-orange-500 transition-colors mb-4 overflow-hidden">
                    {user.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User className="h-8 w-8 text-gray-400 group-hover:text-orange-500" />
                    )}
                </div>
                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">{user.type}</p>
                
                {isMentor && (
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${user.isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.isVerified ? (
                            <><CheckCircle2 className="h-3 w-3" /> Verified</>
                        ) : (
                            <><ShieldAlert className="h-3 w-3" /> Unverified</>
                        )}
                    </div>
                )}
            </div>

            {isMentor && (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="flex flex-col">
                        <button 
                            onClick={() => setActiveTab('bio')}
                            className={`px-6 py-4 text-left text-sm font-medium border-b border-gray-100 transition-colors ${activeTab === 'bio' ? 'bg-orange-50 text-orange-900 border-l-4 border-l-orange-500' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <User className="inline-block h-4 w-4 mr-3" /> Profile & Bio
                        </button>
                        <button 
                            onClick={() => setActiveTab('mentees')}
                            className={`px-6 py-4 text-left text-sm font-medium border-b border-gray-100 transition-colors ${activeTab === 'mentees' ? 'bg-orange-50 text-orange-900 border-l-4 border-l-orange-500' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Users className="inline-block h-4 w-4 mr-3" /> My Mentees
                        </button>
                        <button 
                            onClick={() => setActiveTab('resources')}
                            className={`px-6 py-4 text-left text-sm font-medium border-b border-gray-100 transition-colors ${activeTab === 'resources' ? 'bg-orange-50 text-orange-900 border-l-4 border-l-orange-500' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <FileText className="inline-block h-4 w-4 mr-3" /> Data & Resume
                        </button>
                        <button 
                             onClick={() => setActiveTab('settings')}
                            className={`px-6 py-4 text-left text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-orange-50 text-orange-900 border-l-4 border-l-orange-500' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                             <CreditCard className="inline-block h-4 w-4 mr-3" /> Payouts & Settings
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
            
            {/* ALERT FOR UNVERIFIED MENTORS */}
            {isMentor && !user.isVerified && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                        <h3 className="text-red-800 font-bold mb-1">Verify your School Email</h3>
                        <p className="text-red-600 text-sm">You must verify your <strong>{user.schoolEmail || user.email}</strong> address to appear in search results.</p>
                    </div>
                    {!showVerificationInput ? (
                        <button 
                            onClick={sendCode}
                            className="whitespace-nowrap bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                            Send Code
                        </button>
                    ) : (
                        <div className="flex gap-2">
                             <input 
                                type="text" 
                                placeholder="Code" 
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-24 px-3 py-2 border border-red-300 rounded-lg text-sm bg-white"
                             />
                             <button 
                                onClick={handleVerification}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                            >
                                Verify
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* MENTOR DASHBOARD CONTENT */}
            {isMentor ? (
                <>
                    {/* TAB: BIO */}
                    {activeTab === 'bio' && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 animate-fadeIn shadow-sm">
                             <h3 className="font-bold text-xl text-gray-900 mb-6">Edit Profile Info</h3>
                             <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Full Name</label>
                                        <input type="text" value={user.name} onChange={(e) => updateProfile({name: e.target.value})} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">School</label>
                                        <input type="text" value={user.school || ''} onChange={(e) => updateProfile({school: e.target.value})} placeholder="University" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                                    </div>
                                </div>
                                <div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Current Role & Company</label>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" value={user.role || ''} onChange={(e) => updateProfile({role: e.target.value})} placeholder="Role (e.g. Analyst)" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                                        <input type="text" value={user.company || ''} onChange={(e) => updateProfile({company: e.target.value})} placeholder="Company (e.g. Goldman Sachs)" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                                     </div>
                                </div>
                                <div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Mentor Bio</label>
                                     <textarea rows={5} value={user.bio || ''} onChange={(e) => updateProfile({bio: e.target.value})} placeholder="Tell students about your background and how you can help..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none text-gray-900" />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button className="bg-black text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">Save Changes</button>
                                </div>
                             </div>
                        </div>
                    )}

                    {/* TAB: MENTEES */}
                    {activeTab === 'mentees' && (
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-fadeIn shadow-sm">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-bold text-xl text-gray-900">My Mentees</h3>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-bold">{MOCK_MENTEES.length} Total</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {MOCK_MENTEES.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 text-sm">No mentee requests yet.</p>
                                    </div>
                                ) : (
                                    MOCK_MENTEES.map((mentee) => (
                                        <div key={mentee.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                            <img src={mentee.imageUrl} alt={mentee.name} className="w-12 h-12 rounded-full object-cover" />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-gray-900">{mentee.name}</h4>
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${mentee.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                                        {mentee.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">{mentee.school}</p>
                                                <p className="text-sm text-gray-800 mt-2 bg-gray-100 p-2 rounded-lg border border-gray-200 italic">"{mentee.message}"</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-colors">
                                                    <Send className="h-4 w-4 text-gray-600" />
                                                </button>
                                                {mentee.status === 'Pending' && (
                                                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                                        Accept
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* TAB: RESOURCES */}
                    {activeTab === 'resources' && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 animate-fadeIn space-y-8 shadow-sm">
                             <div>
                                 <h3 className="font-bold text-xl text-gray-900 mb-2">Upload Resume</h3>
                                 <p className="text-gray-500 text-sm mb-4">Upload your resume. Verified students will be able to view it after connecting.</p>
                                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-500 hover:bg-orange-50/50 transition-colors cursor-pointer group">
                                     <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3 group-hover:text-orange-500 transition-colors" />
                                     <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                                     <p className="text-xs text-gray-500 mt-1">PDF only (max 5MB)</p>
                                 </div>
                             </div>

                             <div className="pt-8 border-t border-gray-100">
                                 <h3 className="font-bold text-xl text-gray-900 mb-2">Availability & Scheduling</h3>
                                 <p className="text-gray-500 text-sm mb-4">Add your Calendly link or preferred meeting times.</p>
                                 <div className="relative">
                                     <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                     <input type="text" placeholder="https://calendly.com/your-name" className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                                 </div>
                             </div>
                        </div>
                    )}

                    {/* TAB: SETTINGS */}
                    {activeTab === 'settings' && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 animate-fadeIn space-y-6 shadow-sm">
                            <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-4">Payout Settings</h3>
                                <div className="bg-[#635BFF]/5 border border-[#635BFF]/20 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <CreditCard className="h-6 w-6 text-[#635BFF]" />
                                        <h4 className="font-bold text-[#635BFF]">Stripe Connect</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-6">
                                        We use Stripe to ensure you get paid quickly and securely. You must connect a Stripe account to accept mentorship requests.
                                    </p>
                                    <button className="bg-[#635BFF] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#534be0] transition-colors shadow-sm">
                                        Connect with Stripe
                                    </button>
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="font-bold text-xl text-gray-900 mb-4">Meeting Notifications</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Send meeting invites to:</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <input 
                                                type="email" 
                                                value={meetingEmail} 
                                                onChange={(e) => setMeetingEmail(e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" 
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">We'll forward calendar invites to this email.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                /* STANDARD STUDENT PROFILE */
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                     <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">First Name</label>
                                <input type="text" placeholder="First Name" value={user.name.split(' ')[0]} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Last Name</label>
                                <input type="text" placeholder="Last Name" value={user.name.split(' ')[1] || ''} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                            </div>
                        </div>

                        <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                                <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input type="email" value={user.email} disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-500 cursor-not-allowed" />
                                </div>
                        </div>

                        <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">School</label>
                                <div className="relative">
                                <School className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input type="text" placeholder="Add your school" className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                                </div>
                        </div>

                        <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Target Role</label>
                                <div className="relative">
                                <Building className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input type="text" placeholder="e.g. Investment Banking Analyst" className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-gray-900" />
                                </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <button className="bg-black text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
