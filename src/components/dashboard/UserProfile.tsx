
import { useNavigate } from "react-router-dom";
import TripCard from "./TripCard";
import { Button } from "../button";
import { Edit3, Trash2 } from "lucide-react";
import { Trip, City } from "../../types";

export default function UserProfile() {
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "john@example.com",
    language: "English",
    photoURL: "https://via.placeholder.com/150",
  };

  // Sample City for stops
  const sampleCity: City = {
    id: "city1",
    name: "Sample City",
    country: "Sample Country",
    costIndex: 70,
    popularity: 85,
    description: "A beautiful sample city with many attractions.",
    imageUrl: "https://source.unsplash.com/400x300/?city",
    currency: "USD",
  };

  const makeTrip = (
    id: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
  
    totalBudget: number,
    isPublic: boolean
  ): Trip => ({
    id,
    name,
    description,
    startDate,
    endDate,
    userId: "user1",
  
    stops: [
      {
        id: "stop1",
        tripId: id,
        cityId: sampleCity.id,
        city: sampleCity,
        startDate,
        endDate,
        activities: [],
        accommodation: "Hotel Sample",
        transportCost: 200,
        order: 1,
      },
    ],
    totalBudget,
    isPublic,
    createdAt: new Date().toISOString(),
  });

  const preplannedTrips: Trip[] = [
    makeTrip(
      "1",
      "Paris Getaway",
      "Romantic 5-day trip exploring Paris.",
      "2025-09-15",
      "2025-09-20",
      "https://source.unsplash.com/300x200/?paris",
      2500,
      true
    ),
    makeTrip(
      "2",
      "Tokyo Adventure",
      "Explore the neon city and traditional shrines.",
      "2025-11-05",
      "2025-11-12",
      "https://source.unsplash.com/300x200/?tokyo",
      3200,
      true
    ),
    makeTrip(
      "3",
      "Maldives Retreat",
      "Relax on beautiful beaches and enjoy water sports.",
      "2026-01-20",
      "2026-01-27",
      "https://source.unsplash.com/300x200/?maldives",
      4500,
      false
    ),
  ];

  const previousTrips: Trip[] = [
    makeTrip(
      "4",
      "New York City",
      "Visited Times Square and Statue of Liberty.",
      "2025-06-10",
      "2025-06-17",
      "https://source.unsplash.com/300x200/?newyork",
      2800,
      false
    ),
    makeTrip(
      "5",
      "Dubai Luxury Tour",
      "Explored skyscrapers and desert safari.",
      "2025-04-01",
      "2025-04-08",
      "https://source.unsplash.com/300x200/?dubai",
      5000,
      false
    ),
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-b from-[#050505] to-[#0f172a] rounded-3xl min-h-screen">
      {/* User Info */}
      <div className="flex items-center gap-6 mb-8 bg-gradient-to-br from-[#111827] to-[#1e293b] shadow-lg p-6 rounded-3xl">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-cyan-500"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-500">Language: {user.language}</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/edit-profile")}
            className="flex items-center gap-2"
          >
            <Edit3 size={18} />
            Edit Profile
          </Button>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => window.confirm("Delete account?")}
          >
            <Trash2 size={18} />
            Delete
          </Button>
        </div>
      </div>

      {/* Preplanned Trips */}
      <h3 className="text-3xl font-semibold mb-6 text-white">Preplanned Trips</h3>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {preplannedTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      {/* Previous Trips */}
      <h3 className="text-3xl font-semibold mb-6 text-white">Previous Trips</h3>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {previousTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
