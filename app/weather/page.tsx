"use client";
import SearchBar from "@/components/SearchBar";
import { openWeatherWMOToEmoji } from '@akaguny/open-meteo-wmo-to-emoji';
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type WeatherResult = {
  daily: {
    weather_code: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
    wind_gusts_10m_max: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};


function WeatherContent() {
  const [weatherResults, setWeatherResults] = useState<WeatherResult | null>(null);
  const searchParams = useSearchParams();
  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");

  useEffect(() => {
    if (!longitude || !latitude) {
      return;
    }
    getWeatherResults(longitude, latitude);
  }, [longitude, latitude]);

  if (!longitude || !latitude) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  const getWeatherResults = async (longitude: string, latitude: string) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&daily=weather_code,precipitation_probability_max,uv_index_max,wind_gusts_10m_max,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`); //TODO: Dynamic timezone
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }
      setWeatherResults(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      //TODO Handle error (e.g., show notification)
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-blue-500 text-white py-12">
        <h1 className="text-4xl font-bold mb-3 text-center">Weather Results for {latitude}, {longitude}</h1>
        <p className="text-lg text-gray-200 mb-10 text-center">Visualize weather data from the Open Meteo API.</p>
        <SearchBar />
      </div>
      <section className="py-12">
        {
          weatherResults ? (
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full max-w-xl mx-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
                <div className="flex items-center mb-4">
                  <h5 className="text-xl font-bold leading-none">7 day forecast</h5>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {
                      weatherResults.daily.weather_code.map((code, index) => {
                        const date = new Date(Date.now() + index * 86400000);
                        return (
                          <li key={index} className="py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                              <div className="shrink-0">
                                <p>{`${index == 0 ? "Today" : index == 1 ? "Tomorrow" : date.toLocaleDateString("en", { weekday: 'long' })}`}</p>
                                <p>{`${date.toLocaleDateString()}`}</p>
                              </div>
                              <div className="flex flex-1 items-center justify-start min-w-0 gap-2 ml-8">
                                <p className="text-3xl">
                                  {openWeatherWMOToEmoji(code).value}
                                </p>
                                <p className="text-md">
                                  {openWeatherWMOToEmoji(code).description}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-thermometer-half" viewBox="0 0 16 16">
                                  <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
                                  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                                </svg>
                                <div className="flex flex-col items-center gap-1">
                                  <span className="font-bold">max: {weatherResults.daily.temperature_2m_max[index]}°C</span>
                                  <span className="font-bold">min: {weatherResults.daily.temperature_2m_min[index]}°C</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-droplet" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
                                      <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
                                    </svg>
                                    <span className="font-bold">{weatherResults.daily.precipitation_probability_max[index]}%</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                                    </svg>
                                    <span className="font-bold">{weatherResults.daily.uv_index_max[index]}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16">
                                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                                  </svg>
                                  <span className="font-bold">{weatherResults.daily.wind_gusts_10m_max[index]} km/h</span>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading weather data...</p>
          )
        }
      </section>
    </>
  );
}

export default function Search() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    }>
      <WeatherContent />
    </Suspense>
  );
}
