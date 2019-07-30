const fs = require('fs');

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title;
    })
    
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log('new note added...')
    } else {
        console.log('Note title: ' + title + ' is already taken!');
    }
}

const removeNote = function(title) {
    const notes = loadNotes();
    var notesLength = notes.length;
    for(var i = 0; i < notes.length; i++) {
        if(notes[i].title === title) {
            notes.splice(i, 1);
        }
    }
    var newNotesLength = notes.length;
    if(notesLength != newNotesLength) {
        console.log('Note with title: ' + title + ' deleted' )
    } else {
        console.log('No note found with title: ' + title);
    }
    saveNotes(notes);
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function() {
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