
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string, type: 'student' | 'mentor') => void;
  logout: () => void;
  verifyMentor: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Mock login logic: For demo purposes, we'll assume email containing 'mentor' is a mentor, else student.
    const isMentor = email.toLowerCase().includes('mentor');
    setUser({
      name: isMentor ? 'Demo Mentor' : 'Demo Student',
      email,
      type: isMentor ? 'mentor' : 'student',
      schoolEmail: email,
      isVerified: isMentor, // Mock verification for demo mentors
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      school: 'Harvard University',
      role: isMentor ? 'Investment Banking Analyst' : undefined,
      company: isMentor ? 'Goldman Sachs' : undefined
    });
  };

  const signup = (name: string, email: string, type: 'student' | 'mentor') => {
    setUser({
      name,
      email,
      type,
      schoolEmail: email,
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const verifyMentor = () => {
    if (user) {
      setUser({ ...user, isVerified: true });
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, verifyMentor, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
