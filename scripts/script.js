/* ===============================
   HOME PAGE – MESSAGE OF THE DAY
================================ */

function updateTodayMessage() {
  const messageElement = document.querySelector("#today-message");
  if (!messageElement) return;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const dayName = days[today.getDay()];

  messageElement.textContent = `Today is ${dayName}. Choose one habit and rise 1% today.`;
}

updateTodayMessage();

/* ===============================
   HABITS PAGE – CORE LOGIC
================================ */

const habitForm = document.querySelector("#habit-form");
const habitList = document.querySelector("#habit-list");
const habitError = document.querySelector("#habit-error");
const pillarFilter = document.querySelector("#pillar-filter");
const habitStats = document.querySelector("#habit-stats");

let habits = [];

/* -------- LOCAL STORAGE -------- */

function loadHabits() {
  const storedHabits = localStorage.getItem("ascendHabits");

  if (storedHabits) {
    habits = JSON.parse(storedHabits);
  } else {
    habits = [];
  }
}

function saveHabits() {
  localStorage.setItem("ascendHabits", JSON.stringify(habits));
}

/* -------- RENDER FUNCTIONS -------- */

function renderHabits() {
  if (!habitList) return;

  const filterValue = pillarFilter ? pillarFilter.value : "all";

  const filteredHabits =
    filterValue === "all"
      ? habits
      : habits.filter((habit) => habit.pillar === filterValue);

  if (filteredHabits.length === 0) {
    habitList.innerHTML = `
      <li class="habit-item">
        <div class="habit-main">
          <span class="habit-name">No habits yet</span>
          <span class="habit-meta">Create your first habit to begin your journey.</span>
        </div>
      </li>
    `;
    renderStats(filteredHabits);
    return;
  }

  habitList.innerHTML = filteredHabits
    .map((habit) => {
      const pillar =
        habit.pillar.charAt(0).toUpperCase() + habit.pillar.slice(1);
      const frequency =
        habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1);

      return `
        <li class="habit-item" data-id="${habit.id}">
          <div class="habit-main">
            <span class="habit-name">${habit.name}</span>
            <span class="habit-meta">
              ${pillar} • ${frequency} • ${habit.done ? "Completed" : "Pending"}
            </span>
            ${
              habit.notes
                ? `<span class="habit-meta">Note: ${habit.notes}</span>`
                : ""
            }
          </div>
          <div class="habit-actions">
            <button class="btn-toggle ${habit.done ? "done" : ""}">
              ${habit.done ? "Mark as not done" : "Mark as done"}
            </button>
            <button class="btn-delete">Delete</button>
          </div>
        </li>
      `;
    })
    .join("");

  renderStats(filteredHabits);
}

function renderStats(list) {
  if (!habitStats) return;

  const total = list.length;
  const completed = list.filter((habit) => habit.done).length;

  const byPillar = list.reduce(
    (acc, habit) => {
      acc[habit.pillar] = (acc[habit.pillar] || 0) + 1;
      return acc;
    },
    { physical: 0, intellectual: 0, social: 0, spiritual: 0 }
  );

  habitStats.innerHTML = `
    <p><strong>Total habits:</strong> ${total}</p>
    <p><strong>Completed:</strong> ${completed}</p>
    <p>
      <strong>By pillar:</strong>
      Physical ${byPillar.physical} ·
      Intellectual ${byPillar.intellectual} ·
      Social ${byPillar.social} ·
      Spiritual ${byPillar.spiritual}
    </p>
  `;
}

/* -------- EVENT HANDLERS -------- */

function handleAddHabit(event) {
  event.preventDefault();

  const nameInput = document.querySelector("#habit-name");
  const pillarSelect = document.querySelector("#habit-pillar");
  const frequencySelect = document.querySelector("#habit-frequency");
  const notesInput = document.querySelector("#habit-notes");

  const name = nameInput.value.trim();
  const pillar = pillarSelect.value;
  const frequency = frequencySelect.value;
  const notes = notesInput.value.trim();

  if (!name || !pillar || !frequency) {
    habitError.textContent = "Please fill in all required fields.";
    return;
  }

  habitError.textContent = "";

  const newHabit = {
    id: Date.now().toString(),
    name,
    pillar,
    frequency,
    notes,
    done: false,
  };

  habits.push(newHabit);
  saveHabits();
  renderHabits();
  habitForm.reset();
}

function handleHabitClick(event) {
  const item = event.target.closest(".habit-item");
  if (!item) return;

  const id = item.dataset.id;

  if (event.target.classList.contains("btn-delete")) {
    habits = habits.filter((habit) => habit.id !== id);
  }

  if (event.target.classList.contains("btn-toggle")) {
    habits = habits.map((habit) =>
      habit.id === id ? { ...habit, done: !habit.done } : habit
    );
  }

  saveHabits();
  renderHabits();
}

/* -------- INIT -------- */

function initHabitsPage() {
  if (!habitForm || !habitList) return;

  loadHabits();
  renderHabits();

  habitForm.addEventListener("submit", handleAddHabit);
  habitList.addEventListener("click", handleHabitClick);

  if (pillarFilter) {
    pillarFilter.addEventListener("change", renderHabits);
  }
}

initHabitsPage();
