const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'notes.json');

function loadNotes() {
  try {
    if (!fs.existsSync(dataFile)) {
      return [];
    }
    const buffer = fs.readFileSync(dataFile);
    const text = buffer.toString();
    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to load notes:', error.message);
    return [];
  }
}

function saveNotes(notes) {
  try {
    const jsonData = JSON.stringify(notes, null, 2);
    fs.writeFileSync(dataFile, jsonData);
  } catch (error) {
    console.error('Failed to save notes:', error.message);
  }
}

function addNote(note) {
  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);
}

function listNotes() {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log('No notes found.');
    return;
  }
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
}

function deleteNote(id) {
  const notes = loadNotes();
  const index = id - 1;
  if (index < 0 || index >= notes.length) {
    return false;
  }
  notes.splice(index, 1);
  saveNotes(notes);
  return true;
}

function updateNote(id, text) {
  const notes = loadNotes();
  const index = id - 1;
  if (index < 0 || index >= notes.length) {
    return false;
  }
  notes[index] = text;
  saveNotes(notes);
  return true;
}

function searchNotes(query) {
  const notes = loadNotes();
  const lowerQuery = query.toLowerCase();
  const results = notes
    .map((note, index) => ({ note, index }))
    .filter(({ note }) => note.toLowerCase().includes(lowerQuery));

  if (results.length === 0) {
    console.log('No matching notes found.');
    return;
  }

  results.forEach(({ note, index }) => {
    console.log(`${index + 1}. ${note}`);
  });
}

module.exports = {
  addNote,
  listNotes,
  deleteNote,
  updateNote,
  searchNotes,
};
