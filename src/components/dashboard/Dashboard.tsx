import React, { useState, useEffect } from "react";
import { useTrip } from "../../contexts/TripContext";
import { useAuth } from "../../contexts/AuthContext";

import {
  MapPin,
  Calendar as CalendarIcon,
  DollarSign,
  Plane,
  TrendingUp,
  Search,
} from "lucide-react";
import { Button } from "../button";
import BgImage from "./scene.jpg";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// Distance calculation via Haversine formula
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
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
  { name: "Taj Mahal", country: "India" },
  { name: "Jaipur", country: "India" },
  { name: "New Delhi", country: "India" },
  { name: "New York", country: "USA" },
  { name: "Los Angeles", country: "USA" },
  { name: "Paris", country: "France" },
  { name: "Eiffel Tower", country: "France" },
  { name: "London", country: "UK" },
  { name: "Rome", country: "Italy" },
  { name: "Venice", country: "Italy" },
  { name: "Tokyo", country: "Japan" },
  { name: "Kyoto", country: "Japan" },
];

const categories = [
  {
    id: "islands",
    title: "Islands",
    places: [
      {
        id: "maldives",
        name: "Maldives",
        country: "Maldives",
        flightCost: 1200,
        img:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "bora-bora",
        name: "Bora Bora",
        country: "French Polynesia",
        flightCost: 1500,
        img:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "seychelles",
        name: "Seychelles",
        country: "Seychelles",
        flightCost: 1400,
        img:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "bali",
        name: "Bali",
        country: "Indonesia",
        flightCost: 900,
        img:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
  {
    id: "resorts",
    title: "Resorts",
    places: [
      {
        id: "mauritius",
        name: "Mauritius Resort",
        country: "Mauritius",
        flightCost: 1100,
        img:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "fiji",
        name: "Fiji Resort",
        country: "Fiji",
        flightCost: 1300,
        img:
          "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "bahamas",
        name: "Bahamas Resort",
        country: "Bahamas",
        flightCost: 1250,
        img:
          "https://images.unsplash.com/photo-1494522336258-3d4cc2b8a4e7?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "maldives-resort",
        name: "Maldives Resort",
        country: "Maldives",
        flightCost: 1350,
        img:
          "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=800&q=60",
      },
    ],
  },
];

const Dashboard: React.FC = () => {
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
  const [suggestions, setSuggestions] = useState<{ name: string; country: string }[]>([]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  // Modal form states
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [fromLocation, setFromLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [fromLocationName, setFromLocationName] = useState("Detecting location...");
  const [fromManual, setFromManual] = useState(false);
  const [manualFromInput, setManualFromInput] = useState("");
  const [distance, setDistance] = useState(0);
  const [travelMode, setTravelMode] = useState(travelModes[0]);
  const [budget, setBudget] = useState(0);

  const [userTrips, setUserTrips] = useState(trips);

  // Search handlers
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.length >= 3) {
      const filtered = touristData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (place: { name: string; country: string }) => {
    setSearch(`${place.name}, ${place.country}`);
    setSuggestions([]);
  };

  // On modal open: reset form + request location permission
  const handleAddToPlan = (place: any) => {
    setSelectedPlace(place);

    setDateRange([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: "selection",
      },
    ]);
    setFromManual(false);
    setManualFromInput("");
    setDistance(0);
    setTravelMode(travelModes[0]);
    setBudget(0);
    setFromLocationName("Detecting location...");

    // Request location permission & set location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFromLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setFromLocationName("Your current location");
        },
        (error) => {
          setFromLocation(null);
          setFromLocationName("Location permission denied");
        }
      );
    } else {
      setFromLocation(null);
      setFromLocationName("Geolocation not supported");
    }

    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => setModalOpen(false);

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
      setDistance(Number(d.toFixed(2)));
    } else {
      setDistance(0);
    }
  }, [fromLocation, selectedPlace]);

  // Update budget whenever distance or travelMode changes
  useEffect(() => {
    if (distance > 0) {
      const costPerKm = travelCostPerKm[travelMode as keyof typeof travelCostPerKm] || 0.5;
      setBudget(Number((distance * costPerKm).toFixed(2)));
    } else {
      setBudget(0);
    }
  }, [distance, travelMode]);

  // Save trip handler
  const handleSavePlan = () => {
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    if (!fromLocation && !fromManual) {
      alert("Please provide your starting location.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Please select trip dates.");
      return;
    }
    if (endDate < startDate) {
      alert("End date cannot be before start date.");
      return;
    }

    const newTrip = {
      id: `trip_${Date.now()}`,
      name: selectedPlace.name,
      description: `Trip to ${selectedPlace.name}, ${selectedPlace.country}`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
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
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          activities: [],
          accommodation: "Not specified",
          transportCost: budget,
          order: 1,
        },
      ],
      totalBudget: budget || selectedPlace.flightCost || 0,
      isPublic: false,
      createdAt: new Date().toISOString(),
      distance: distance,
      travelMode,
      fromLocationName: fromManual ? manualFromInput : fromLocationName,
    };

    setUserTrips((prev) => [...prev, newTrip]);
    alert("Trip added to your profile!");
    setModalOpen(false);
  };

  return (
    <div className={`relative ${modalOpen ? "overflow-hidden" : ""}`}>
      {/* Main Content with blur on modal open */}
      <section
        className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden transition-filter duration-300 ${
          modalOpen ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={BgImage}
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-[90rem] mx-auto px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Your Journey
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
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
              className="text-lg px-10 py-5 flex items-center gap-3 justify-center"
              onClick={() => navigate("/trips/create")}
            >
              <MapPin className="w-6 h-6" />
              Plan New Trip
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-5 bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center gap-3 justify-center"
            >
              <CalendarIcon className="w-6 h-6" />
              Explore Destinations
            </Button>
          </div>

          <div
            className="max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-14 py-10 bg-gradient-to-b from-[#050505] to-[#0f172a] min-h-screen rounded-3xl"
            style={{ userSelect: "none" }}
          >
            {/* Welcome Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-white mb-3">
                Welcome back, {user?.name}!
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
                  className="bg-gradient-to-br from-[#0d1117] to-[#1e293b] p-8 rounded-3xl shadow-lg hover:shadow-cyan-500/30 border border-gray-800 transition-all duration-300 transform hover:-translate-y-1 cursor-default select-none"
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
              <div className="flex items-center bg-black border border-gray-700 rounded-full px-5 py-3">
                <Search className="text-gray-400 w-6 h-6 mr-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search tourist places..."
                  className="bg-transparent outline-none text-white w-full text-lg"
                />
              </div>
              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-[#0d1117] border border-gray-700 rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto">
                  {suggestions.map((place, idx) => (
                    <li
                      key={idx}
                      className="px-6 py-3 hover:bg-gray-800 cursor-pointer text-white text-left text-lg"
                      onClick={() => handleSelectSuggestion(place)}
                    >
                      {place.name} —{" "}
                      <span className="text-gray-400">{place.country}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Popular Destinations - Animated Scroll */}
            <div className="mx-[0.5cm] mb-14">
              <div className="overflow-hidden relative rounded-3xl border border-gray-700">
                <div
                  className="flex gap-8 whitespace-nowrap animate-scroll"
                  style={{ animation: "scrollLeft 30s linear infinite" }}
                >
                  {[...Array(2)].map((_, outerIdx) =>
                    touristData.map((place, idx) => {
                      const globalIndex = outerIdx * touristData.length + idx;
                      return (
                        <div
                          key={globalIndex}
                          className="cursor-pointer bg-gradient-to-br from-[#111827] to-[#1e293b] rounded-3xl p-6 min-w-[220px] max-w-[220px] text-white shadow-md hover:shadow-cyan-400/80 flex flex-col items-center justify-center select-none"
                          style={{ userSelect: "none" }}
                          title={`${place.name}, ${place.country}`}
                        >
                          <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                          <p className="text-base text-gray-400">{place.country}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Categories Section */}
            {categories.map((category) => (
              <div key={category.id} className="mb-20">
                <h2 className="text-4xl font-semibold text-white mb-8">
                  {category.title}
                </h2>

                {/* Horizontal scroll for category places */}
                <div className="flex overflow-x-auto gap-8 pb-3 no-scrollbar">
                  {category.places.map((place) => (
                    <div
                      key={place.id}
                      className="bg-gradient-to-br from-[#111827] to-[#1e293b] rounded-3xl shadow-lg min-w-[320px] max-w-[320px] flex flex-col overflow-hidden"
                    >
                      <img
                        src={place.img}
                        alt={place.name}
                        className="w-full h-48 object-cover rounded-t-3xl"
                        loading="lazy"
                      />
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-white">{place.name}</h3>
                        <p className="text-gray-400 mb-3 text-lg">{place.country}</p>
                        <p className="text-green-400 font-semibold mb-6 text-lg">
                          Flight Cost: ${place.flightCost.toLocaleString()}
                        </p>

                        <div className="mt-auto flex gap-4">
                          <button
                            onClick={() =>
                              alert(`Booking flight to ${place.name}...`)
                            }
                            className="flex-grow bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg transition text-lg font-semibold"
                          >
                            Book Now
                          </button>
                          <button
                            onClick={() => handleAddToPlan(place)}
                            className="flex-grow bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition text-lg font-semibold"
                          >
                            Add to Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Animation Keyframes */}
            <style>
              {`
                @keyframes scrollLeft {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}
            </style>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-6">
          <div className="bg-gradient-to-br from-[#050505] to-[#0f172a] rounded-3xl max-w-3xl w-full p-8 text-white shadow-xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">
              Add "{selectedPlace.name}" to Your Plan
            </h2>

            {/* Location input */}
            <div className="mb-6">
              <label className="text-lg font-semibold text-cyan-400 mb-2 block">
                From
              </label>
              {!fromManual ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={fromLocationName}
                    className="flex-grow cursor-not-allowed rounded-lg border border-cyan-600 bg-[#111827] px-4 py-3 text-white text-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setFromManual(true);
                      setManualFromInput("");
                      setFromLocationName("");
                      setFromLocation(null);
                    }}
                    className="text-cyan-400 hover:text-cyan-600 font-semibold transition"
                  >
                    Enter manually
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter your starting location"
                    value={manualFromInput}
                    onChange={(e) => setManualFromInput(e.target.value)}
                    className="flex-grow rounded-lg border border-cyan-600 bg-[#111827] px-4 py-3 text-white text-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      if (manualFromInput.trim() === "") return;
                      setFromLocationName(manualFromInput.trim());
                      setFromManual(false);
                    }}
                    className="text-cyan-400 hover:text-cyan-600 font-semibold transition"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Date Range Picker */}
            <div className="mb-6">
              <label className="text-lg font-semibold text-cyan-400 mb-3 block">
                Select Trip Dates
              </label>
              <DateRange
                editableDateInputs={true}
                
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={["#22d3ee"]}
                months={1}
                direction="horizontal"
                className="rounded-lg shadow-lg"
              />
              <div className="flex justify-between mt-2 px-4 text-white text-sm font-semibold">
                <div>
                  <span className="text-cyan-400">From: </span>
                  {format(dateRange[0].startDate, "PPP")}
                </div>
                <div>
                  <span className="text-cyan-400">To: </span>
                  {format(dateRange[0].endDate, "PPP")}
                </div>
              </div>
            </div>

            {/* Distance display (if lat/lng available) */}
            <div className="mb-6">
              <label className="text-lg font-semibold text-cyan-400 mb-2 block">
                Distance (km)
              </label>
              <input
                type="number"
                readOnly
                value={distance > 0 ? distance : ""}
                placeholder="Distance will be calculated automatically"
                className="w-full rounded-md bg-[#111827] text-white px-3 py-2 outline-none border border-gray-700 focus:border-cyan-500"
              />
            </div>

            {/* Travel mode & budget */}
            <div className="flex gap-6 mb-8">
              <div className="flex-grow">
                <label className="text-lg font-semibold text-cyan-400 mb-2 block">
                  Travel Mode
                </label>
                <select
                  value={travelMode}
                  onChange={(e) => setTravelMode(e.target.value)}
                  className="w-full rounded-md bg-[#111827] text-white px-3 py-2 outline-none border border-gray-700 focus:border-cyan-500"
                >
                  {travelModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow">
                <label className="text-lg font-semibold text-cyan-400 mb-2 block">
                  Budget ($)
                </label>
                <input
                  type="number"
                  readOnly
                  value={budget > 0 ? budget : ""}
                  placeholder="Budget calculated automatically"
                  className="w-full rounded-md bg-[#111827] text-white px-3 py-2 outline-none border border-gray-700 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className="px-6 py-2 font-semibold"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="hero"
                className="px-6 py-2 font-semibold"
                onClick={handleSavePlan}
              >
                Save
              </Button>
            </div>

            {/* Close X */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
