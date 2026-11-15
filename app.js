const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const buttons = [...document.querySelectorAll(".filters button")];
const search = document.querySelector("#search");
let currentArea = "all";

function render() {
  const query = search.value.toLowerCase();
  const shown = ships.filter((ship) =>
    (currentArea === "all" || ship.area === currentArea) &&
    (ship.title.toLowerCase().includes(query) || ship.detail.toLowerCase().includes(query)));
  list.replaceChildren(...shown.map((ship) => {
    const item = document.createElement("li");
    item.innerHTML = `<time datetime="${ship.date}">${ship.date}</time><h2></h2><p></p>`;
    item.querySelector("h2").textContent = ship.title;
    item.querySelector("p").textContent = ship.detail;
    return item;
  }));
  empty.textContent = query ? "Nothing matches your search." : "Nothing in this area yet.";
  empty.hidden = shown.length > 0;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((candidate) => candidate.classList.toggle("on", candidate === button));
    currentArea = button.dataset.area;
    render();
  });
});

search.addEventListener("input", render);

render();
