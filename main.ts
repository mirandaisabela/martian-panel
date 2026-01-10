// NASA InSight API URL
const API_URL =
  "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0";

// Select elements
const dashboard = document.getElementById("dashboard") as HTMLDivElement;
const chartCanvas = document.getElementById("marsChart") as HTMLCanvasElement;

// Interface for a Martian Sol
interface SolData {
  sol: string;
  AT?: { av?: number };
  PRE?: { av?: number };
  HWS?: { av?: number };
}

// Fetch Mars weather data
async function fetchMarsWeather() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const sols: SolData[] = data.sol_keys.map((sol: string) => ({
      sol,
      ...data[sol],
    }));

    displaySols(sols);
    createChart(sols);
  } catch (error) {
    dashboard.innerHTML = "<p>Failed to fetch Mars weather data.</p>";
    console.error(error);
  }
}

// Display Sol cards
function displaySols(sols: SolData[]) {
  dashboard.innerHTML = "";

  sols.forEach((sol) => {
    const temp = sol.AT?.av ?? null;
    const pressure = sol.PRE?.av ?? null;
    const wind = sol.HWS?.av ?? null;

    const card = document.createElement("div");
    card.className = "sol-card";

    card.innerHTML = `
      <h2>Sol ${sol.sol}</h2>
      <p>Temperature: <span class="${temp === null ? "no-data" : "value"}">${temp ?? "No data"}</span> °C</p>
      <p>Pressure: <span class="${pressure === null ? "no-data" : "value"}">${pressure ?? "No data"}</span> Pa</p>
      <p>Wind: <span class="${wind === null ? "no-data" : "value"}">${wind ?? "No data"}</span> m/s</p>
    `;

    dashboard.appendChild(card);
  });
}

// Create chart
function createChart(sols: SolData[]) {
  const labels = sols.map((s) => `Sol ${s.sol}`);
  const temperatures = sols.map((s) => s.AT?.av ?? null);
  const pressures = sols.map((s) => s.PRE?.av ?? null);
  const winds = sols.map((s) => s.HWS?.av ?? null);

  new (window as any).Chart(chartCanvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "#f1c40f",
          spanGaps: true,
        },
        {
          label: "Pressure (Pa)",
          data: pressures,
          borderColor: "#1abc9c",
          spanGaps: true,
        },
        {
          label: "Wind (m/s)",
          data: winds,
          borderColor: "#3498db",
          spanGaps: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Mars Weather Over the Last Sols",
        },
      },
    },
  });
}

// Run app
fetchMarsWeather();
