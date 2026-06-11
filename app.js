const notes = require('./notes');
//process.argv is actually a built-in feature in Node.js
//  that lets your script talk to the outside world.
//process is a global object that provides information
//  about the currently running Node.js process
//The argv property stands for Argument Vector (essentially, an array of arguments).
const command = process.argv[2];
const rawArg = process.argv[3];
const extraArgs = process.argv.slice(4);

function showHelp() {
  console.log('Available commands:');
  console.log('  node app.js add "Note text"');
  console.log('  node app.js list');
  console.log('  node app.js delete <id>');
  console.log('  node app.js update <id> "New note text"');
  console.log('  node app.js search "query"');
}

if (!command) {
  showHelp();
  process.exit(0);
}

switch (command) {
  case 'add': {
    const noteText = [rawArg, ...extraArgs].filter(Boolean).join(' ');
    if (!noteText) {
      console.log('Please provide a note to add.');
      break;
    }
    notes.addNote(noteText);
    console.log('Note added successfully.');
    break;
  }
  case 'list': {
    notes.listNotes();
    break;
  }
  case 'delete': {
    const id = Number(rawArg);
    if (!rawArg || Number.isNaN(id)) {
      console.log('Please provide a valid note id.');
      break;
    }
    const success = notes.deleteNote(id);
    if (success) {
      console.log('Note deleted.');
    } else {
      console.log('Invalid note id');
    }
    break;
  }
  case 'update': {
    const id = Number(rawArg);
    const noteText = extraArgs.filter(Boolean).join(' ');
    if (!rawArg || Number.isNaN(id) || !noteText) {
      console.log('Please provide a valid note id and new text.');
      break;
    }
    const success = notes.updateNote(id, noteText);
    if (success) {
      console.log('Note updated successfully.');
    } else {
      console.log('Invalid note id');
    }
    break;
  }
  case 'search': {
    const query = [rawArg, ...extraArgs].filter(Boolean).join(' ');
    if (!query) {
      console.log('Please provide a search query.');
      break;
    }
    notes.searchNotes(query);
    break;
  }
  default:
    console.log(`Unknown command: ${command}`);
    showHelp();
}
