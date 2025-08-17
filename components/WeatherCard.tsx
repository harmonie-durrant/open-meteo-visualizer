import React from "react";

export default function WeatherCard({ title, fullWidth, children }: { title: string; fullWidth?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-wrap items-center justify-center`}>
      <div className={`w-full ${fullWidth ? "max-w-7xl" : "max-w-xl"} mx-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8`}>
        <div className="flex items-center mb-4">
          <h5 className="text-xl font-bold leading-none">{title}</h5>
        </div>
        {children}
        </div>
    </div>
  )
}