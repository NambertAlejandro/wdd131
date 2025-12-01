// contador
let count = Number(localStorage.getItem("reviews") || 0);
count++;
localStorage.setItem("reviews", count);
document.getElementById("counter").textContent =
  "Total reviews submitted: " + count;

// mostrar GET data
const params = new URLSearchParams(window.location.search);
let output = "";
params.forEach((value, key) => {
  output += `<p><strong>${key}:</strong> ${value}</p>`;
});
document.getElementById("data").innerHTML = output;
