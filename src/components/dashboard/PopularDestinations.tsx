import React from 'react';
import { TrendingUp, Star, MapPin } from 'lucide-react';

const PopularDestinations: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?w=300',
      trending: true
    },
    {
      id: 2,
      name: 'Tokyo',
      country: 'Japan',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?w=300',
      trending: true
    },
    {
      id: 3,
      name: 'New York',
      country: 'USA',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?w=300',
      trending: false
    },
    {
      id: 4,
      name: 'Barcelona',
      country: 'Spain',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?w=300',
      trending: true
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0d1117] to-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-800">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Popular Destinations</h3>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent snap-x snap-mandatory pb-4">
        {destinations.concat(destinations).map((destination, idx) => ( // Duplicate for loop-like feel
          <div
            key={`${destination.id}-${idx}`}
            className="min-w-[220px] snap-start bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-gray-700 rounded-xl shadow-md overflow-hidden flex-shrink-0 hover:shadow-cyan-500/20 transform hover:scale-105 transition-all"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold truncate">{destination.name}</h4>
                {destination.trending && (
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full p-1">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center mt-1 text-gray-400 text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                {destination.country}
              </div>
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                <span className="text-gray-400 text-sm">{destination.rating}</span>
              </div>
              <button className="mt-3 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
