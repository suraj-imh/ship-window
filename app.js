const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const buttons = [...document.querySelectorAll(".filters button")];
const baseLabels = new Map(buttons.map((button) => [button, button.textContent]));

function shownShips(area) {
  return ships.filter((ship) => area === "all" || ship.area === area);
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

labelButtons();
render("all");
