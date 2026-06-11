# Notes Manager

A small Node.js command-line notes manager using JSON file storage.

## What it does

This project is a simple terminal app that can:

- Add notes
- List notes
- Delete a note by number
- Update a note by number
- Search notes by keyword

It stores notes in `notes.json`, so your data remains between runs.

## Files

- `app.js` - command parser that reads arguments and calls note functions
- `notes.js` - note logic for reading, writing, updating, deleting, and searching
- `notes.json` - the data file that stores the notes as JSON

## How to use

Open a terminal in the project folder and run:

```bash
node app.js add "Learn Node.js"
node app.js list
node app.js delete 1
node app.js update 2 "Master Node.js"
node app.js search Node
```

### Commands

- `node app.js add "Note text"`
  - Adds a new note.
- `node app.js list`
  - Shows all saved notes.
- `node app.js delete <id>`
  - Deletes the note with the given number.
- `node app.js update <id> "New note text"`
  - Replaces the note text at the given number.
- `node app.js search "query"`
  - Finds notes containing the query text.

## Example session

```bash
node app.js add "Learn Node.js"
node app.js add "Learn Express"
node app.js list
# Output:
# 1. Learn Node.js
# 2. Learn Express

node app.js delete 1
node app.js list
# Output:
# 1. Learn Express
```

## Notes

- The app uses `process.argv` to read command-line arguments.
- It uses the Node.js `fs` module to read and write `notes.json`.
- If `notes.json` does not exist, the app starts with an empty note list.
