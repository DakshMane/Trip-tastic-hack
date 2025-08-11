import { useParams } from "react-router-dom";
import {useTrip} from "../../contexts/TripContext";
import { useState } from "react";


export default function ItineraryPage() {
  const { tripId } = useParams();
  const { trips } = useTrip();
  const trip = trips.find(t => t.id === tripId);

  const [days, setDays] = useState(trip?.days || 0);
  const [budget, setBudget] = useState(trip?.totalBudget || 0);

  if (!trip) {
    return <p className="text-center mt-10">Trip not found</p>;
  }

  const handleSave = () => {
    console.log("Updated itinerary:", { days, budget });
    // You can add API call here to save data
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{trip.name} - Itinerary</h1>
      <p className="text-gray-600 mb-6">{trip.description}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Total Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Total Budget ($)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg"
        >
          Save Itinerary
        </button>
      </div>
    </div>
  );
}
