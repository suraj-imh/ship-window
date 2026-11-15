const ships = [
  {
    area: "page",
    date: "2026-11-15",
    title: "First public page",
    detail: "Opened the window: a list of what shipped, with nothing else on the page."
  },
  {
    area: "notes",
    date: "2026-11-15",
    title: "Notes stay short",
    detail: "Each entry is a date, a title, and one sentence. Longer writeups live somewhere else."
  },
  {
    area: "page",
    date: "2026-11-15",
    title: "Filter by area",
    detail: "All, Page, and Notes. The empty state shows when a filter has no entries."
  }
];

const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const buttons = [...document.querySelectorAll(".filters button")];

function render(area) {
  const shown = ships.filter((ship) => area === "all" || ship.area === area);
  list.replaceChildren(...shown.map((ship) => {
    const item = document.createElement("li");
    item.innerHTML = `<time datetime="${ship.date}">${ship.date}</time><h2></h2><p></p>`;
    item.querySelector("h2").textContent = ship.title;
    item.querySelector("p").textContent = ship.detail;
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

render("all");
