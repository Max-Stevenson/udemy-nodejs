const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);
    
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('new note added...'));
    } else {
        console.log(chalk.red.inverse('Note title: ' + title + ' is already taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    var notesLength = notes.length;
    for(var i = 0; i < notes.length; i++) {
        if(notes[i].title === title) {
            notes.splice(i, 1);
        }
    }
    var newNotesLength = notes.length;
    if(notesLength != newNotesLength) {
        console.log(chalk.green.inverse('Note with title: ' + title + ', deleted' ));
    } else {
        console.log(chalk.red.inverse('No note found with title: ' + title));
    }
    saveNotes(notes);
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};