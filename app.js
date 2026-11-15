const FEED_URL = "https://feeds.example.com/ship-window.json";
const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const buttons = [...document.querySelectorAll(".filters button")];
const baseLabels = new Map(buttons.map((button) => [button, button.textContent]));
let entries = ships;

function isEntry(entry) {
  return entry && ["area", "date", "title", "detail"].every((key) => typeof entry[key] === "string");
}

async function loadFeed() {
  try {
    const response = await fetch(FEED_URL, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) && data.every(isEntry) ? data : null;
  } catch {
    return null;
  }
}

function shownShips(area) {
  return entries.filter((ship) => area === "all" || ship.area === area);
}

function labelButtons() {
  buttons.forEach((button) => {
    button.textContent = `${baseLabels.get(button)} (${shownShips(button.dataset.area).length})`;
  });
}

function render(area) {
  const shown = shownShips(area);
  list.replaceChildren(...shown.map((ship) => {
    const item = document.createElement("li");
    const time = document.createElement("time");
    time.setAttribute("datetime", ship.date);
    time.textContent = ship.date;
    const title = document.createElement("h2");
    title.textContent = ship.title;
    const detail = document.createElement("p");
    detail.textContent = ship.detail;
    item.append(time, title, detail);
    return item;
  }));
  empty.hidden = shown.length > 0;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((candidate) => candidate.classList.toggle("on", candidate === button));
    render(button.dataset.area);
  });
});

loadFeed().then((data) => {
  entries = data ?? ships;
  labelButtons();
  render("all");
});
