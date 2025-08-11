import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trip, Stop, City, Activity } from '../types';

interface TripContextType {
  trips: Trip[];
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  createTrip: (tripData: Partial<Trip>) => Trip;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;
  addStop: (tripId: string, stop: Omit<Stop, 'id' | 'tripId'>) => void;
  updateStop: (stopId: string, updates: Partial<Stop>) => void;
  removeStop: (stopId: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};

// Mock data
const mockCities: City[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    costIndex: 85,
    popularity: 95,
    description: 'The City of Light',
    imageUrl: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?w=800',
    currency: 'EUR'
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    costIndex: 78,
    popularity: 88,
    description: 'Modern metropolis meets tradition',
    imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?w=800',
    currency: 'JPY'
  },
  {
    id: '3',
    name: 'Rome',
    country: 'Italy',
    costIndex: 72,
    popularity: 90,
    description: 'The Eternal City',
    imageUrl: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?w=800',
    currency: 'EUR'
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    name: 'Eiffel Tower Visit',
    description: 'Visit the iconic Eiffel Tower',
    category: 'sightseeing',
    cost: 25,
    duration: 3,
    imageUrl: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?w=400',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Seine River Cruise',
    description: 'Romantic cruise along the Seine',
    category: 'sightseeing',
    cost: 35,
    duration: 2,
    imageUrl: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?w=400',
    rating: 4.6
  }
];

// helper function to calculate total days
const calculateDays = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      name: 'European Adventure',
      description: 'Exploring the beautiful cities of Europe',
      startDate: '2024-06-15',
      endDate: '2024-06-25',
      days: calculateDays('2024-06-15', '2024-06-25'),
      userId: '1',
      stops: [
        {
          id: '1',
          tripId: '1',
          cityId: '1',
          city: mockCities[0],
          startDate: '2024-06-15',
          endDate: '2024-06-20',
          activities: mockActivities,
          accommodation: 'Hotel de Ville',
          transportCost: 150,
          order: 1
        },
        {
          id: '2',
          tripId: '1',
          cityId: '3',
          city: mockCities[2],
          startDate: '2024-06-20',
          endDate: '2024-06-25',
          activities: [],
          accommodation: 'Roma Inn',
          transportCost: 200,
          order: 2
        }
      ],
      totalBudget: 2500,
      dailyBudget: 2500 / calculateDays('2024-06-15', '2024-06-25'),
      notes: 'Pack light and bring a camera',
      isPublic: true,
      createdAt: '2024-01-15'
    }
  ]);

  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const createTrip = (tripData: Partial<Trip>): Trip => {
    const days = calculateDays(tripData.startDate || '', tripData.endDate || '');
    const dailyBudget =
      days > 0 && tripData.totalBudget
        ? tripData.totalBudget / days
        : 0;

    const newTrip: Trip = {
      id: Date.now().toString(),
      name: tripData.name || '',
      description: tripData.description || '',
      startDate: tripData.startDate || '',
      endDate: tripData.endDate || '',
      days,
      userId: '1',
      stops: [],
      totalBudget: tripData.totalBudget || 0,
      dailyBudget,
      notes: tripData.notes || '',
      isPublic: tripData.isPublic || false,
      createdAt: new Date().toISOString()
    };

    setTrips([...trips, newTrip]);
    return newTrip;
  };

  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips(trips.map(trip => {
      if (trip.id !== tripId) return trip;

      const updatedTrip = { ...trip, ...updates };

      // recalc days if dates change
      if (updates.startDate || updates.endDate) {
        updatedTrip.days = calculateDays(updatedTrip.startDate, updatedTrip.endDate);
      }

      // recalc dailyBudget if budget or days change
      if (
        updates.totalBudget !== undefined ||
        updates.startDate ||
        updates.endDate
      ) {
        updatedTrip.dailyBudget =
          updatedTrip.days && updatedTrip.totalBudget
            ? updatedTrip.totalBudget / updatedTrip.days
            : 0;
      }

      return updatedTrip;
    }));
  };

  const deleteTrip = (tripId: string) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
  };

  const addStop = (tripId: string, stopData: Omit<Stop, 'id' | 'tripId'>) => {
    const newStop: Stop = {
      ...stopData,
      id: Date.now().toString(),
      tripId
    };

    setTrips(trips.map(trip =>
      trip.id === tripId
        ? { ...trip, stops: [...trip.stops, newStop] }
        : trip
    ));
  };

  const updateStop = (stopId: string, updates: Partial<Stop>) => {
    setTrips(trips.map(trip => ({
      ...trip,
      stops: trip.stops.map(stop =>
        stop.id === stopId ? { ...stop, ...updates } : stop
      )
    })));
  };

  const removeStop = (stopId: string) => {
    setTrips(trips.map(trip => ({
      ...trip,
      stops: trip.stops.filter(stop => stop.id !== stopId)
    })));
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        currentTrip,
        setCurrentTrip,
        createTrip,
        updateTrip,
        deleteTrip,
        addStop,
        updateStop,
        removeStop
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
