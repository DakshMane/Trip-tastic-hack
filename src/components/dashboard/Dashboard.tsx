import React, { useState, useEffect } from "react";
import BgImg from "./download.jpg"


const MapPin = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2}/>
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2}/>
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2}/>
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2}/>
  </svg>
);

const DollarSign = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23" strokeWidth={2}/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeWidth={2}/>
  </svg>
);

const Plane = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const TrendingUp = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeWidth={2}/>
    <polyline points="17 6 23 6 23 12" strokeWidth={2}/>
  </svg>
);

const Search = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth={2}/>
    <path d="M21 21l-4.35-4.35" strokeWidth={2}/>
  </svg>
);

const X = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" strokeWidth={2}/>
    <line x1="6" y1="6" x2="18" y2="18" strokeWidth={2}/>
  </svg>
);

const Navigation = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="3,11 22,2 13,21 11,13 3,11" strokeWidth={2}/>
  </svg>
);

const Clock = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2}/>
    <polyline points="12,6 12,12 16,14" strokeWidth={2}/>
  </svg>
);

// Mock contexts - replace with your actual contexts
const useTrip = () => ({
  trips: [
    { id: 1, startDate: "2025-09-01", totalBudget: 2500, stops: [{ id: 1 }, { id: 2 }] },
    { id: 2, startDate: "2025-10-15", totalBudget: 1800, stops: [{ id: 1 }] },
  ]
});

const useAuth = () => ({
  user: { id: "user1", name: "Alex" }
});

const useNavigate = () => (path) => console.log(`Navigate to: ${path}`);

// Distance calculation via Haversine formula
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const travelCostPerKm = {
  Flight: 0.5,
  Bus: 0.1,
  Train: 0.2,
};

const travelModes = ["Flight", "Bus", "Train"];

const touristData = [
  { name: "Taj Mahal", country: "India", lat: 27.1751, lng: 78.0421 },
  { name: "Jaipur", country: "India", lat: 26.9124, lng: 75.7873 },
  { name: "New Delhi", country: "India", lat: 28.6139, lng: 77.2090 },
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
];

const categories = [
  {
    id: "islands",
    title: "Tropical Islands",
    places: [
      {
        id: "maldives",
        name: "Maldives",
        country: "Maldives",
        flightCost: 1200,
        lat: 3.2028,
        lng: 73.2207,
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "bora-bora",
        name: "Bora Bora",
        country: "French Polynesia",
        flightCost: 1500,
        lat: -16.5004,
        lng: -151.7415,
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "seychelles",
        name: "Seychelles",
        country: "Seychelles",
        flightCost: 1400,
        lat: -4.6796,
        lng: 55.4920,
        img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "bali",
        name: "Bali",
        country: "Indonesia",
        flightCost: 900,
        lat: -8.3405,
        lng: 115.0920,
        img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
  {
    id: "resorts",
    title: "Luxury Resorts",
    places: [
      {
        id: "mauritius",
        name: "Mauritius Resort",
        country: "Mauritius",
        flightCost: 1100,
        lat: -20.2,
        lng: 57.5,
        img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "fiji",
        name: "Fiji Resort",
        country: "Fiji",
        flightCost: 1300,
        lat: -17.7134,
        lng: 178.0650,
        img: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "bahamas",
        name: "Bahamas Resort",
        country: "Bahamas",
        flightCost: 1250,
        lat: 25.0343,
        lng: -77.3963,
        img: "https://images.unsplash.com/photo-1494522336258-3d4cc2b8a4e7?auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
];

// Simple Button component
const Button = ({ children, variant = "default", size = "md", className = "", onClick, disabled = false, ...props }) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-gray-600 hover:bg-gray-500 text-white",
    hero: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/30",
    outline: "border-2 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple date picker component
const DatePicker = ({ value, onChange, label }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-cyan-400 mb-2">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
      />
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { trips } = useTrip();
  const { user } = useAuth();

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) >= new Date()
  );
  const totalBudget = trips.reduce((sum, trip) => sum + trip.totalBudget, 0);
  const totalDestinations = trips.reduce(
    (sum, trip) => sum + trip.stops.length,
    0
  );

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Modal form states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [fromLocationName, setFromLocationName] = useState("Detecting location...");
  const [fromManual, setFromManual] = useState(false);
  const [manualFromInput, setManualFromInput] = useState("");
  const [distance, setDistance] = useState(0);
  const [travelMode, setTravelMode] = useState(travelModes[0]);
  const [budget, setBudget] = useState(0);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const [userTrips, setUserTrips] = useState(trips);

  // Search handlers
  const handleSearchChange = (value) => {
    setSearch(value);
    if (value.length >= 2) {
      const filtered = touristData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.country.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (place) => {
    setSearch(`${place.name}, ${place.country}`);
    setSuggestions([]);
  };

  // Location detection
  const detectLocation = () => {
    setIsGettingLocation(true);
    setFromLocationName("Detecting location...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFromLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setFromLocationName("Your current location");
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setFromLocation(null);
          setFromLocationName("Location access denied");
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setFromLocation(null);
      setFromLocationName("Geolocation not supported");
      setIsGettingLocation(false);
    }
  };

  // On modal open: reset form + request location permission
  const handleAddToPlan = (place) => {
    setSelectedPlace(place);

    // Set default dates (today + 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextWeek.toISOString().split('T')[0]);

    setFromManual(false);
    setManualFromInput("");
    setDistance(0);
    setTravelMode(travelModes[0]);
    setBudget(0);

    // Detect location
    detectLocation();
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlace(null);
    setSuggestions([]);
  };

  // Calculate distance when fromLocation or selectedPlace changes
  useEffect(() => {
    if (
      fromLocation &&
      selectedPlace &&
      selectedPlace.lat !== undefined &&
      selectedPlace.lng !== undefined
    ) {
      const d = getDistanceFromLatLonInKm(
        fromLocation.lat,
        fromLocation.lng,
        selectedPlace.lat,
        selectedPlace.lng
      );
      setDistance(Math.round(d));
    } else {
      setDistance(0);
    }
  }, [fromLocation, selectedPlace]);

  // Update budget whenever distance or travelMode changes
  useEffect(() => {
    if (distance > 0) {
      const costPerKm = travelCostPerKm[travelMode] || 0.5;
      setBudget(Math.round(distance * costPerKm));
    } else if (selectedPlace?.flightCost) {
      setBudget(selectedPlace.flightCost);
    } else {
      setBudget(0);
    }
  }, [distance, travelMode, selectedPlace]);

  // Save trip handler
  const handleSavePlan = () => {
    if (!startDate || !endDate) {
      alert("Please select trip dates.");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
      return;
    }
    if (!fromLocation && !fromManual) {
      alert("Please provide your starting location.");
      return;
    }

    const newTrip = {
      id: `trip_${Date.now()}`,
      name: selectedPlace.name,
      description: `Trip to ${selectedPlace.name}, ${selectedPlace.country}`,
      startDate: startDate,
      endDate: endDate,
      userId: user?.id || "user1",
      coverPhoto: selectedPlace.img,
      stops: [
        {
          id: `stop_${Date.now()}`,
          tripId: `trip_${Date.now()}`,
          cityId: selectedPlace.id,
          city: {
            id: selectedPlace.id,
            name: selectedPlace.name,
            country: selectedPlace.country,
            description: "",
            imageUrl: selectedPlace.img,
            costIndex: 0,
            popularity: 0,
            currency: "USD",
          },
          startDate: startDate,
          endDate: endDate,
          activities: [],
          accommodation: "Not specified",
          transportCost: budget,
          order: 1,
        },
      ],
      totalBudget: budget,
      isPublic: false,
      createdAt: new Date().toISOString(),
      distance: distance,
      travelMode,
      fromLocationName: fromManual ? manualFromInput : fromLocationName,
    };

    setUserTrips((prev) => [...prev, newTrip]);
    alert(`Trip to ${selectedPlace.name} added successfully!`);
    closeModal();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Content with blur on modal open */}
      <div className={`transition-all duration-300 ${modalOpen ? "blur-sm pointer-events-none" : ""}`}>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
     <div className="absolute inset-0">
  {/* <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" /> */}
  <img src={BgImg} alt="" className="w-full h-full object-cover rounded-xl" />
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 rounded-xl" />
</div>


          {/* Content */}
          <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Your Journey
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create unforgettable adventures with our intelligent trip planner.
              From dream destinations to detailed itineraries.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button
                variant="hero"
                size="lg"
                className="text-lg px-10 py-5 flex items-center gap-3"
                onClick={() => navigate("/trips/create")}
              >
                <MapPin className="w-6 h-6" />
                Plan New Trip
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-5 bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center gap-3"
              >
                <CalendarIcon className="w-6 h-6" />
                Explore Destinations
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Welcome Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              Welcome back!
            </h1>
            <p className="text-gray-400 text-lg">
              Ready for your next adventure? Let's plan something amazing.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {[
              {
                icon: Plane,
                value: trips.length,
                label: "Total Trips",
                colors: "from-cyan-500 to-blue-600",
              },
              {
                icon: MapPin,
                value: totalDestinations,
                label: "Destinations",
                colors: "from-orange-500 to-red-600",
              },
              {
                icon: DollarSign,
                value: `$${totalBudget.toLocaleString()}`,
                label: "Total Budget",
                colors: "from-green-500 to-emerald-600",
              },
              {
                icon: TrendingUp,
                value: upcomingTrips.length,
                label: "Upcoming",
                colors: "from-purple-500 to-pink-600",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-xl border border-gray-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${stat.colors} shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    <p className="text-lg text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative w-full max-w-lg mx-auto">
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-5 py-3">
              <Search className="text-gray-400 w-6 h-6 mr-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search destinations..."
                className="bg-transparent outline-none text-white w-full text-lg placeholder-gray-500"
              />
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-40 max-h-52 overflow-y-auto">
                {suggestions.map((place, idx) => (
                  <li
                    key={idx}
                    className="px-6 py-3 hover:bg-gray-700 cursor-pointer text-white text-left text-lg border-b border-gray-700 last:border-b-0"
                    onClick={() => handleSelectSuggestion(place)}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{place.name}</span>
                      <span className="text-gray-400">— {place.country}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Popular Destinations - Animated Scroll */}
          <div className="mb-14 overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-6">Popular Destinations</h2>
            <div className="relative rounded-3xl border border-gray-700 bg-gray-800/50 p-4">
              <div className="flex gap-6 animate-scroll">
                {[...touristData, ...touristData].map((place, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 min-w-[220px] text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                    onClick={() => handleSelectSuggestion(place)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-lg font-semibold truncate">{place.name}</h3>
                    </div>
                    <p className="text-gray-400">{place.country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Section */}
          {categories.map((category) => (
            <div key={category.id} className="mb-20">
              <h2 className="text-3xl font-semibold text-white mb-8">
                {category.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.places.map((place) => (
                  <div
                    key={place.id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <img
                      src={place.img}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{place.name}</h3>
                      <p className="text-gray-400 mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {place.country}
                      </p>
                      <p className="text-green-400 font-semibold mb-4">
                        From ${place.flightCost.toLocaleString()}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          variant="hero"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAddToPlan(place)}
                        >
                          <Plane className="w-4 h-4 mr-2" />
                          Plan Trip
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-4"
                          onClick={() => alert(`Viewing details for ${place.name}...`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-2xl w-full p-8 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">
                Plan Your Trip to {selectedPlace.name}
              </h2>
              <p className="text-gray-400 text-lg">{selectedPlace.country}</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Location input */}
              <div>
                <label className="text-lg font-semibold text-cyan-400 mb-3 block">
                  <Navigation className="inline w-5 h-5 mr-2" />
                  From
                </label>
                {!fromManual ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      value={fromLocationName}
                      className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white cursor-not-allowed"
                      placeholder="Detecting your location..."
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFromManual(true)}
                      disabled={isGettingLocation}
                    >
                      Manual
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={detectLocation}
                      disabled={isGettingLocation}
                    >
                      {isGettingLocation ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : (
                        <Navigation className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Enter your starting location"
                      value={manualFromInput}
                      onChange={(e) => setManualFromInput(e.target.value)}
                      className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() => {
                        if (manualFromInput.trim()) {
                          setFromLocationName(manualFromInput.trim());
                          setFromManual(false);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>

              {/* Date inputs */}
              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                />
              </div>

              {/* Distance and Travel Mode */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-lg font-semibold text-cyan-400 mb-2 block">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    readOnly
                    value={distance || ""}
                    placeholder="Calculating..."
                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold text-cyan-400 mb-2 block">
                    Travel Mode
                  </label>
                  <select
                    value={travelMode}
                    onChange={(e) => setTravelMode(e.target.value)}
                    className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    {travelModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-lg font-semibold text-cyan-400 mb-2 block">
                  <DollarSign className="inline w-5 h-5 mr-2" />
                  Estimated Budget
                </label>
                <input
                  type="number"
                  readOnly
                  value={budget || ""}
                  placeholder="Calculating budget..."
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white cursor-not-allowed text-xl font-semibold"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Budget calculated based on distance and travel mode
                </p>
              </div>

              {/* Trip Duration */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Trip Duration:</span>
                  <span className="text-white font-medium">
                    {startDate && endDate ? 
                      `${Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} days` 
                      : 'Select dates'
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-400">Estimated Cost:</span>
                  <span className="text-green-400 font-semibold">
                    ${budget ? budget.toLocaleString() : '0'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
              <ChatbotEmbed/>
              <Button
                variant="outline"
                className="px-6 py-2"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="hero"
                className="px-6 py-2"
                onClick={handleSavePlan}
              >
                <Plane className="w-4 h-4 mr-2" />
                Save Trip
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;