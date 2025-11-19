document.getElementById("lastModified").textContent = document.lastModified;
// ----- Static values -----
const temperature = 10; // °C
const windSpeed = 15; // km/h

// ----- Wind Chill formula (metric) -----
function calculateWindChill(t, v) {
  return (
    13.12 +
    0.6215 * t -
    11.37 * Math.pow(v, 0.16) +
    0.3965 * t * Math.pow(v, 0.16)
  );
}

// ----- Wind chill rules -----
let windChillValue = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
  windChillValue = calculateWindChill(temperature, windSpeed).toFixed(1) + "°C";
}

// ----- Display values in the page -----
document.getElementById("temperature").textContent = temperature + "°C";
document.getElementById("wind").textContent = windSpeed + " km/h";
document.getElementById("wind_chill").textContent = windChillValue;
