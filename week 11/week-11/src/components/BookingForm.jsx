import { useState } from "react";

function BookingForm() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState("Economy");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (source === destination) {
      alert("Source and Destination cannot be same");
      return;
    }

    setMessage(`
Booking Confirmed!

From: ${source}
To: ${destination}
Date: ${travelDate}
Passengers: ${passengers}
Class: ${flightClass}
`);

    setSource("");
    setDestination("");
    setTravelDate("");
    setPassengers(1);
    setFlightClass("Economy");
  };

  return (
    <div className="booking-card">
      <h2>✈ Flight Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Source City"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Destination City"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          required
        />

        <input
          type="number"
          min="1"
          max="10"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />

        <select
          value={flightClass}
          onChange={(e) => setFlightClass(e.target.value)}
        >
          <option>Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>

        <button type="submit">
          Book Ticket
        </button>
      </form>

      {message && (
        <div className="confirmation">
          <pre>{message}</pre>
        </div>
      )}
    </div>
  );
}

export default BookingForm;