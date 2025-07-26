import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between bg-blue-500 text-white p-12">
      <h1 className="text-4xl font-bold mb-2 text-center">Open weather visualizer</h1>
      <p className="text-lg text-gray-200 mb-8 text-center">Visualize weather data from the Open Meteo API.</p>
      <SearchBar />
    </div>
  );
}
