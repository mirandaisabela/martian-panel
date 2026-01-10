# Mars Weather Dashboard – InSight

This project is a dashboard built with **TypeScript** that consumes the NASA **InSight Mars Weather API** to display recent weather data from the surface of Mars, including temperature, atmospheric pressure, and wind speed.

## Features
- Fetches real data from NASA’s InSight mission
- Displays summarized weather information per Sol (Martian day)
- Renders a line chart using Chart.js
- Handles missing or unavailable data gracefully

## Technologies
- TypeScript
- HTML5
- CSS3
- Chart.js
- NASA InSight Weather API

## Known Issue (Important)
The NASA InSight mission has ended, and the weather API is **no longer actively maintained**.  
Because of this, the API may fail, return incomplete data, or trigger fetch errors such as:


This behavior is expected and **not caused by the application code**.  
The project includes error handling to prevent crashes when the API is unavailable.

## Purpose
This project was created for learning and portfolio purposes, demonstrating:
- API consumption
- Data visualization
- TypeScript usage in the browser
- Error handling for unreliable external services
