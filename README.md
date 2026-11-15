# Ship window

A one-page public changelog. Open `index.html` in a browser.

Entries live in the `ships` list in `ships.js`, newest first. `app.js` renders them.

Run the checks with `npm test`. They need Node 22 and nothing else.

The check "no injected fault is active" fails while `/var/factory/faults/validate` exists, or `/var/factory/faults/validate-<branch>` for the current branch (slashes become underscores). The factory test harness creates those files to force a failed check.

## Latest note

The newest notes entry is "Repair loops".
