// src/components/Weather.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface WeatherData {
  city: string;
  temp: string;
  humidity: string;
  tempMax: string;
  tempMin: string;
  speed: string;
}

const Weather: React.FC = () => {
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData>({
    city: "",
    temp: "",
    humidity: "",
    tempMax: "",
    tempMin: "",
    speed: "",
  });

  const apiKey = "aba6ff9d6de967d5eac6fd79114693cc";

  const searchWeather = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        // Show toast if weather data is not found
        toast({
          title: "No weather found.",
          description: "Please enter a valid city name.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        throw new Error("No weather found.");
      }

      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Show toast if there is an error fetching the data
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem fetching weather data.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const displayWeather = (data: any) => {
    const { name, main, wind } = data;
    const { temp, humidity, temp_max, temp_min } = main;
    const { speed } = wind;

    setWeatherData({
      city: `Weather in ${name}`,
      temp: `${temp}°C`,
      humidity: `Humidity: ${humidity}%`,
      tempMax: `Max Temperature: ${temp_max}°C`,
      tempMin: `Min Temperature: ${temp_min}°C`,
      speed: `Wind speed: ${speed} km/h`,
    });
  };

  useEffect(() => {
    const reverseGeocode = (latitude: number, longitude: number) => {
      const apikey = "90a096f90b3e4715b6f2e536d934c5af";
      const api_url = "https://api.opencagedata.com/geocode/v1/json";
      const request_url = `${api_url}?key=${apikey}&q=${encodeURIComponent(
        latitude + "," + longitude
      )}&pretty=1&no_annotations=1`;

      fetch(request_url)
        .then((response) => response.json())
        .then((data) => {
          searchWeather(data.results[0].components.city);
        })
        .catch((error) => {
          console.error("Error in reverse geocoding:", error);
        });
    };

    const getLocation = () => {
      function success(position: GeolocationPosition) {
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, console.error);
      } else {
        searchWeather("Manipal");
      }
    };

    getLocation();
  }, []);

  const handleSearch = () => {
    const city = (document.querySelector(".search-bar") as HTMLInputElement)
      .value;
    searchWeather(city);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <img
        className="h-20 w-20"
        src="https://weatherstack.com/site_images/weather_icon_full_clouds.svg"
        alt="Weather Icon"
      />
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Weather Forecast</h1>
      <div className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          className="search-bar p-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter city name..."
          onKeyUp={(event) => {
            if (event.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="weather text-center bg-white p-6 rounded-lg shadow-md">
        <h1 className="city text-2xl font-semibold text-gray-700 mb-4">
          {weatherData.city}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-200 p-4 rounded-lg">
            <img
              className="w-10 h-10 mx-auto mb-2"
              src="https://weatherstack.com/site_images/weather_icon_full_sun.svg"
              alt="Temperature Icon"
            />
            <h2 className="text-lg font-semibold">Temperature</h2>
            <p className="text-xl">{weatherData.temp}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <img
              className="w-10 h-10 mx-auto mb-2"
              src="https://weatherstack.com/site_images/weather_icon_full_sun.svg"
              alt="Humidity Icon"
            />
            <h2 className="text-lg font-semibold">Humidity</h2>
            <p className="text-xl">{weatherData.humidity}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <img
              className="w-10 h-10 mx-auto mb-2"
              src="https://weatherstack.com/site_images/weather_icon_full_sun.svg"
              alt="Max Temp Icon"
            />
            <h2 className="text-lg font-semibold">Max Temperature</h2>
            <p className="text-xl">{weatherData.tempMax}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <img
              className="w-10 h-10 mx-auto mb-2"
              src="https://weatherstack.com/site_images/weather_icon_full_sun.svg"
              alt="Min Temp Icon"
            />
            <h2 className="text-lg font-semibold">Min Temperature</h2>
            <p className="text-xl">{weatherData.tempMin}</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <img
              className="w-10 h-10 mx-auto mb-2"
              src="https://weatherstack.com/site_images/weather_icon_full_sun.svg"
              alt="Wind Icon"
            />
            <h2 className="text-lg font-semibold">Wind Speed</h2>
            <p className="text-xl">{weatherData.speed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
