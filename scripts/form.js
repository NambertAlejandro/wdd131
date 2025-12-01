const products = [
  { id: 1, name: "Keyboard" },
  { id: 2, name: "TV" },
  { id: 3, name: "HeadPhone" },
  { id: 4, name: "Speaker" },
];

const select = document.getElementById("choose-product");

select.innerHTML = `<option value="" disabled selected>Select a Product ...</option>`;

products.forEach((product) => {
  const opt = document.createElement("option");
  opt.value = product.id;
  opt.textContent = product.name;
  select.appendChild(opt);
});
