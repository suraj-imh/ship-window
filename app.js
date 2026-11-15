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
