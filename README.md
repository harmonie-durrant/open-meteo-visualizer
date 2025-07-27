# 🌤️ Open Météo Interactive Weather Forecast

<img alt="Open Météo Visualizer Banner" src="/screenshots/readme-banner.png" />

## Project Description

This project is an interactive web-based dashboard designed to visualize historical and current weather data for various locations around the globe. Leveraging the Open-Meteo API, users can explore temperature trends, precipitation, wind speed, and more through intuitive and dynamic charts. The dashboard aims to provide a clear, engaging, and responsive interface for meteorological data analysis, showcasing strong front-end development skills, API integration, and data visualization capabilities.

## Key Features

- **Location Search:** Users can search for weather data by entering a city name.
- **Current Weather Display:** Shows real-time weather conditions for the selected location.
- **Historical Data Visualization:** Interactive charts display historical weather metrics over a user-defined period.
- **Dynamic Charting:** Users can select different weather variables to visualize on the charts.
- **Responsive Design:** Optimized for seamless viewing and interaction across various devices.
- **Intuitive User Interface:** Clean and user-friendly design for easy navigation and data exploration distraction free.

## Technologies Used

### Front-End:
- Next.js & Tailwind CSS
- Charting Library (e.g., Recharts, Chart.js, D3.js)

### Version Control & DevOps:
- Git & GitHub
- Github Actions (CI/CD Workflow to deploy to vercel)
- Docker (for a local development build)

## Installation and Setup

You can simply run `docker compose up` if you have docker. Or run natively using node/yarn by following these steps:

1. Clone the repository:
``` bash
    git clone https://github.com/YourUsername/weather-data-dashboard.git
    cd weather-data-dashboard
```

2. Install dependencies:
```bash
    npm install
    # or yarn install
```

3. Start the development server:
```bash
    npm run dev # or yarn dev
```

The application should then be available to visit at `http://localhost:3000`.

## Usage
- Enter a Location: Use the search bar to type in a city name.
- Select Data Type: Choose from available weather metrics (e.g., "Max Temperature," "Precipitation") to update the chart.
- Adjust Date Range: Use the date pickers to specify the historical period you wish to visualize.
- Explore: Interact with the charts to see specific data points.

## API Used
This project utilizes the Open-Meteo API to fetch weather data. It's a free and open-source weather API that provides historical and forecast data.

- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
- [OpenStreetMap Nominatim API](https://nominatim.org/release-docs/latest/api/Search/)

## Screenshots

<img alt="Home Page" src="/screenshots/home-page-v1.png" />

<img alt="Weather Page" src="/screenshots/weather-page-v1.png" />