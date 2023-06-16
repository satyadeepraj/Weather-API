import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d561e4da9b43646bae2a750badc8c417`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <h3>{data.weather[0].description}</h3> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels Like : </p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity : </p>
              {data.main ? (
                <p className="bold">
                  {data.main.humidity}
                  <span>%</span>
                </p>
              ) : null}
            </div>
            <div className="wind">
              <p>Wind Speed : </p>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}mph</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
