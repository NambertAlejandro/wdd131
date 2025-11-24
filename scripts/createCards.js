// Seletores
const container = document.querySelector("#temple-cards");

// Função que cria os cards
function createTempleCards(filteredTemples) {
  container.innerHTML = ""; // limpar antes de renderizar de novo

  filteredTemples.forEach((temple) => {
    const card = document.createElement("section");
    card.classList.add("temple-card");

    card.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area} sq ft</p>
      <img src="${temple.imageUrl}" 
           alt="${temple.templeName}" 
           loading="lazy">
    `;

    container.appendChild(card);
  });
}

// ---------- FILTROS ----------

// Home → todos
document.getElementById("home").addEventListener("click", () => {
  createTempleCards(temples);
});

// Old → antes de 1900
document.getElementById("old").addEventListener("click", () => {
  const oldTemples = temples.filter((t) => {
    const year = parseInt(t.dedicated.split(",")[0]);
    return year < 1900;
  });
  createTempleCards(oldTemples);
});

// New → depois de 2000
document.getElementById("new").addEventListener("click", () => {
  const newTemples = temples.filter((t) => {
    const year = parseInt(t.dedicated.split(",")[0]);
    return year > 2000;
  });
  createTempleCards(newTemples);
});

// Large → área maior que 90000
document.getElementById("large").addEventListener("click", () => {
  const largeTemples = temples.filter((t) => t.area > 90000);
  createTempleCards(largeTemples);
});

// Small → área menor que 10000
document.getElementById("small").addEventListener("click", () => {
  const smallTemples = temples.filter((t) => t.area < 10000);
  createTempleCards(smallTemples);
});

// Render inicial (Home)
createTempleCards(temples);
