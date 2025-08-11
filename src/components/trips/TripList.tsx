import React from 'react';
import { useTrip } from '../../contexts/TripContext';
import { Plus, Search, Filter } from 'lucide-react';
import TripCard from '../dashboard/TripCard';
import { useNavigate } from 'react-router-dom';

const TripList: React.FC = () => {
  const { trips } = useTrip();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-1">Manage and explore all your travel adventures</p>
        </div>
        <button className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg transition-colors">
          <Plus className="h-5 w-5" />
          <span>New Trip</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-gray-700">Filters</span>
        </button>
      </div>

      {/* Trips Grid */}
      {trips.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-6">Create your first trip and start planning your adventure!</p>
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg transition-colors" onClick={() => navigate('/trips/create')}>
              Create Your First Trip
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {trips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;