import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-3 text-center">Open météo visualizer</h1>
      <p className="text-lg text-gray-200 mb-10 text-center">Visualize weather data from the Open Meteo API.</p>
      <SearchBar />
    </div>
  );
}
