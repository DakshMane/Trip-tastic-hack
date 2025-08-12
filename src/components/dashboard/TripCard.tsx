import React from 'react';
import { Trip } from '../../types';
import { Calendar, MapPin, DollarSign, Users, Eye, Edit3, Trash2 } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilTrip = () => {
    const startDate = new Date(trip.startDate);
    const today = new Date();
    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntilTrip();
  const isUpcoming = daysUntil > 0;
  const isPast = daysUntil < 0;

  return (
    <div className="bg-black backdrop-blur-sm rounded-2xl shadow-lg border border-gray-800 hover:shadow-gray-700 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="flex">
        {/* Trip Image */}
        <div className="w-48 h-32 flex-shrink-0 hidden sm:block rounded-l-2xl overflow-hidden">
          <img
            src={trip.stops[0]?.city.imageUrl || 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?w=400'}
            alt={trip.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Trip Details */}
        <div className="flex-1 p-6 text-gray-300">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold mb-1 text-white">{trip.name}</h3>
              <p className="text-gray-400 text-sm">{trip.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {trip.isPublic && (
                <div className="flex items-center space-x-1 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  <Users className="h-3 w-3" />
                  <span>Public</span>
                </div>
              )}
              {isUpcoming && (
                <span className="bg-cyan-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                  {daysUntil} days to go
                </span>
              )}
              {isPast && (
                <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Completed
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-cyan-400" />
              <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-orange-400" />
              <span>{trip.stops.length} stops</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span>${trip.totalBudget.toLocaleString()}</span>
            </div>
          </div>

          {/* Destinations */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-medium text-gray-400">Destinations:</span>
            <div className="flex space-x-2">
              {trip.stops.slice(0, 3).map((stop, index) => (
                <span
                  key={stop.id}
                  className="text-sm text-gray-300 bg-gray-900 px-2 py-1 rounded-lg"
                >
                  {stop.city.name}{index < Math.min(trip.stops.length - 1, 2) && ','}
                </span>
              ))}
              {trip.stops.length > 3 && (
                <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-lg">
                  +{trip.stops.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors bg-gray-900 hover:bg-gray-800 px-3 py-2 rounded-lg">
              <Eye className="h-4 w-4" />
              <span>View</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm font-medium transition-colors bg-gray-900 hover:bg-gray-800 px-3 py-2 rounded-lg">
              <Edit3 className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button className="flex items-center space-x-1 text-red-600 hover:text-red-500 text-sm font-medium transition-colors bg-gray-900 hover:bg-gray-800 px-3 py-2 rounded-lg">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;

