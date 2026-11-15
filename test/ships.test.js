const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const ships = vm.runInNewContext(`${read("ships.js")}\nships`);
const html = read("index.html");
const areas = [...html.matchAll(/data-area="([^"]+)"/g)].map((match) => match[1]).filter((area) => area !== "all");

test("no injected fault is active", () => {
  const flag = "/var/factory/faults/validate";
  assert.ok(!fs.existsSync(flag), `fault injected by the factory test harness (${flag})`);
});

test("every entry has an area with a filter button", () => {
  for (const ship of ships) assert.ok(areas.includes(ship.area), `${ship.title}: no filter for area "${ship.area}"`);
});

test("every entry has a real calendar date", () => {
  for (const ship of ships) {
    assert.match(ship.date, /^\d{4}-\d{2}-\d{2}$/, `${ship.title}: date must be YYYY-MM-DD`);
    assert.equal(new Date(`${ship.date}T00:00:00Z`).toISOString().slice(0, 10), ship.date, `${ship.title}: not a real date`);
  }
});

test("entries are newest first", () => {
  for (let i = 1; i < ships.length; i++) {
    assert.ok(ships[i - 1].date >= ships[i].date, `"${ships[i].title}" is newer than the entry above it`);
  }
});

test("titles are unique", () => {
  const titles = ships.map((ship) => ship.title);
  assert.equal(new Set(titles).size, titles.length);
});

test("details are short and end with a period", () => {
  for (const ship of ships) {
    assert.ok(ship.title.trim(), "title is empty");
    assert.ok(ship.detail.length <= 140, `${ship.title}: detail is over 140 characters`);
    assert.ok(ship.detail.endsWith("."), `${ship.title}: detail must end with a period`);
  }
});

test("the page loads the data before the app", () => {
  assert.ok(html.indexOf('src="ships.js"') < html.indexOf('src="app.js"'));
});
