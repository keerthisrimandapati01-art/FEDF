import { useState, useEffect } from "react";

function BookingForm() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState("Economy");
  const [booking, setBooking] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setHistory(saved);
  }, []);

  const calculatePrice = () => {
    let base = 5000;

    if (flightClass === "Business") base = 10000;
    if (flightClass === "First Class") base = 20000;

    return base * passengers;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (source === destination) {
      alert(
        "Source and Destination cannot be same"
      );
      return;
    }

    const newBooking = {
      id:
        "BK" +
        Math.floor(Math.random() * 100000),
      source,
      destination,
      travelDate,
      passengers,
      flightClass,
      price: calculatePrice(),
    };

    const updatedHistory = [
      ...history,
      newBooking,
    ];

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);
    setBooking(newBooking);

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
          onChange={(e) =>
            setSource(e.target.value)
          }
          required
        />

        <div className="swap-container">
          <button
            type="button"
            className="swap-btn"
            onClick={() => {
              const temp = source;
              setSource(destination);
              setDestination(temp);
            }}
          >
            ⇅ Swap Cities
          </button>
        </div>

        <input
          type="text"
          placeholder="Destination City"
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          required
        />

        <input
          type="date"
          value={travelDate}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) =>
            setTravelDate(e.target.value)
          }
          required
        />

        <input
          type="number"
          min="1"
          max="10"
          value={passengers}
          onChange={(e) =>
            setPassengers(e.target.value)
          }
        />

        <select
          value={flightClass}
          onChange={(e) =>
            setFlightClass(e.target.value)
          }
        >
          <option>Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>

        <button type="submit">
          Book Ticket
        </button>
      </form>

      {booking && (
        <div className="confirmation">
          <h3>Booking Confirmed 🎉</h3>

          <p>
            Booking ID:
            <strong>{booking.id}</strong>
          </p>

          <p>
            {booking.source} →{" "}
            {booking.destination}
          </p>

          <p>Date: {booking.travelDate}</p>

          <p>
            Passengers:
            {booking.passengers}
          </p>

          <p>
            Class:
            {booking.flightClass}
          </p>

          <p>
            Total Fare:
            ₹{booking.price}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h3>Booking History</h3>

          {history.map((item) => (
            <div
              key={item.id}
              className="history-card"
            >
              {item.id} | {item.source}
              → {item.destination}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingForm;