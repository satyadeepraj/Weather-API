import React, { useState } from 'react';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    if (location.trim() === '') {
      setError('Please enter a valid location.');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          setError('Location not found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching the weather data.');
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter location" />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Current Weather for {weather.name}</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
