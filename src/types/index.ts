export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  days?: number; // total trip days
  userId: string;
  
  stops: Stop[];
  totalBudget: number;
  dailyBudget?: number;
  notes?: string;
  isPublic: boolean;
  createdAt: string;
}


export interface Stop {
  id: string;
  tripId: string;
  cityId: string;
  city: City;
  startDate: string;
  endDate: string;
  activities: Activity[];
  accommodation?: string;
  transportCost: number;
  order: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  costIndex: number;
  popularity: number;
  description: string;
  imageUrl: string;
  currency: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: 'sightseeing' | 'food' | 'adventure' | 'culture' | 'nightlife' | 'shopping';
  cost: number;
  duration: number; // in hours
  imageUrl: string;
  rating: number;
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  activities: number;
  meals: number;
  miscellaneous: number;
}