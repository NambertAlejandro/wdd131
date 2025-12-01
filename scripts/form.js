// === ARRAY DE PRODUTOS ===
const products = [
  { id: 1, name: "Keyboard" },
  { id: 2, name: "TV" },
  { id: 3, name: "HeadPhone" },
  { id: 4, name: "Speaker" },
];

// === PREENCHER O SELECT ===
const select = document.getElementById("choose-product");

// Remove as opções fixas que você colocou no HTML
select.innerHTML = `<option value="" disabled selected>Choose a Product</option>`;

products.forEach((product) => {
  const opt = document.createElement("option");
  opt.value = product.id; // value = id
  opt.textContent = product.name; // texto visível
  select.appendChild(opt);
});

// === CONFIGURAR FORM ===
const form = document.querySelector("form");
form.method = "get";
form.action = "review.html";

// === AJUSTAR RADIOS (todos precisam ter o MESMO 'name') ===
const stars = document.querySelectorAll('input[type="radio"]');

st;
