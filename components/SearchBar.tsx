"use client"
import { FormEvent, useState, useRef, useEffect } from 'react';

type geolocationResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside of the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch geocoding api');
        //TODO: Show error notification in the UI
      }
      if (!data.results) {
        throw new Error('No results list found');
      }
      if (data.results.length === 0) {
        setSearchResults([]);
        setIsDropdownOpen(false);
        return;
      }
      setSearchResults(data.results);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error('Error searching for location:', error);
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div ref={searchContainerRef} className="relative flex items-center w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex items-center w-full">   
          <label htmlFor="city-search" className="sr-only">Search</label>
          <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">                
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd"/>
                  </svg>
              </div>
              <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  type="text"
                  id="city-search"
                  placeholder="Search for a city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  required
                  />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
          </button>
      </form>
      {isDropdownOpen && searchResults.length > 0 && (
        <ul className='absolute top-11 z-10 w-full max-h-60 overflow-y-scroll max-w-md bg-white border border-gray-300 rounded-lg shadow-lg text-black'>
          {searchResults.map((result: geolocationResult) => (
          <li key={result.id} className="p-4 hover:bg-gray-100 flex items-center justify-between rounded-lg">
            {/* Country flag */}
            <a
              href={`/weather?latitude=${result.latitude}&longitude=${result.longitude}`}
            >
              <img
                src={`https://flagcdn.com/w20/${result.country_code.toLowerCase()}.png`}
                alt={`${result.country} flag`}
                className="inline-block w-6 h-4 me-2"
              />
              {/* City Name */}
              <span className="font-semibold">{result.name}</span>
            </a>
            {/* Map Icon (Links to OpenStreetMap) */}
            <a
              href={`https://www.openstreetmap.org/#map=13/${result.latitude}/${result.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block h-4 me-2 text-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path>
                <path d="M15 5.764v15"></path>
                <path d="M9 3.236v15"></path>
              </svg>
            </a>
          </li>
        ))}
        </ul>
      )}
    </div>
  );
}