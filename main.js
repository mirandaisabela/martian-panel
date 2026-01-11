"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// NASA InSight API URL
const API_URL = "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0";
// Select elements
const dashboard = document.getElementById("dashboard");
const chartCanvas = document.getElementById("marsChart");
// Fetch Mars weather data
function fetchMarsWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL);
            const data = yield response.json();
            const sols = data.sol_keys.map((sol) => (Object.assign({ sol }, data[sol])));
            displaySols(sols);
            createChart(sols);
        }
        catch (error) {
            dashboard.innerHTML = "<p>Failed to fetch Mars weather data.</p>";
            console.error(error);
        }
    });
}
// Display Sol cards
function displaySols(sols) {
    dashboard.innerHTML = "";
    sols.forEach((sol) => {
        var _a, _b, _c, _d, _e, _f;
        const temp = (_b = (_a = sol.AT) === null || _a === void 0 ? void 0 : _a.av) !== null && _b !== void 0 ? _b : null;
        const pressure = (_d = (_c = sol.PRE) === null || _c === void 0 ? void 0 : _c.av) !== null && _d !== void 0 ? _d : null;
        const wind = (_f = (_e = sol.HWS) === null || _e === void 0 ? void 0 : _e.av) !== null && _f !== void 0 ? _f : null;
        const card = document.createElement("div");
        card.className = "sol-card";
        card.innerHTML = `
      <h2>Sol ${sol.sol}</h2>
      <p>Temperature: <span class="${temp === null ? "no-data" : "value"}">${temp !== null && temp !== void 0 ? temp : "No data"}</span> °C</p>
      <p>Pressure: <span class="${pressure === null ? "no-data" : "value"}">${pressure !== null && pressure !== void 0 ? pressure : "No data"}</span> Pa</p>
      <p>Wind: <span class="${wind === null ? "no-data" : "value"}">${wind !== null && wind !== void 0 ? wind : "No data"}</span> m/s</p>

    `;
        dashboard.appendChild(card);
    });
}
// Create chart
function createChart(sols) {
    const labels = sols.map((s) => `Sol ${s.sol}`);
    const temperatures = sols.map((s) => { var _a, _b; return (_b = (_a = s.AT) === null || _a === void 0 ? void 0 : _a.av) !== null && _b !== void 0 ? _b : null; });
    const pressures = sols.map((s) => { var _a, _b; return (_b = (_a = s.PRE) === null || _a === void 0 ? void 0 : _a.av) !== null && _b !== void 0 ? _b : null; });
    const winds = sols.map((s) => { var _a, _b; return (_b = (_a = s.HWS) === null || _a === void 0 ? void 0 : _a.av) !== null && _b !== void 0 ? _b : null; });
    new window.Chart(chartCanvas, {
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
