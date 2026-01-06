
export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  school: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  tags: string[];
  skills: string[];
  imageUrl: string;
  verified: boolean;
  description: string;
}

export interface Mentee {
  id: string;
  name: string;
  school: string;
  status: 'Pending' | 'Scheduled' | 'Completed';
  imageUrl: string;
  message: string;
}

export interface User {
  name: string;
  email: string;
  type: 'student' | 'mentor';
  schoolEmail?: string;
  isVerified?: boolean;
  avatar?: string;
  role?: string;
  company?: string;
  school?: string;
  bio?: string;
}

export interface FilterCategory {
  title: string;
  options: string[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}
