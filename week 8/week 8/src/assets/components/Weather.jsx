import React, { useEffect, useState } from "react";
import "./Weather.css";

function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=17.38&longitude=78.48&current_weather=true&hourly=relative_humidity_2m"
      );

      if (!res.ok) throw new Error("API error");

      const json = await res.json();
      const hr = new Date().getHours();

      setData({
        temp: json.current_weather.temperature,
        wind: json.current_weather.windspeed,
        dir: json.current_weather.winddirection,
        time: json.current_weather.time,
        humidity: json.hourly.relative_humidity_2m[hr],
      });

      setError("");
    } catch (e) {
      setError("Failed to load weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center error">{error}</div>;

  return (
    <div className="page">
      <div className="dashboard">

        <div className="top">
          <h1>🌦 Weather Panel</h1>
          <p>Hyderabad • Live Data</p>
        </div>

        <div className="tempBox">
          <h2>{data.temp}°C</h2>
          <p>Current Temperature</p>
        </div>

        <div className="grid">
          <div className="card">💨 Wind<br />{data.wind} km/h</div>
          <div className="card">🧭 Direction<br />{data.dir}°</div>
          <div className="card">💧 Humidity<br />{data.humidity}%</div>
          <div className="card">⏱ Updated<br />{data.time}</div>
        </div>

        <button onClick={getWeather} className="btn">
          Refresh Data
        </button>

      </div>
    </div>
  );
}

export default Weather;