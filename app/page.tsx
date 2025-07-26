import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between bg-blue-500 text-white p-12">
      <h1 className="text-4xl font-bold mb-6">Open weather visualizer</h1>
      <SearchBar />
    </div>
  );
}
