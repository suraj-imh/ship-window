# Ship window

A one-page public changelog. Open `index.html` in a browser.

Entries live in the `ships` list in `ships.js`, newest first. `app.js` renders them.

Run the checks with `npm test`. They need Node 22 and nothing else.

The check "no injected fault is active" fails while `/var/factory/faults/validate` exists. The factory test harness creates that file to force a failed check.

