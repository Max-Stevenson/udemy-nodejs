const notes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing note...');
    }
})

yargs.command({
    command: 'list',
    describe: 'Lists all stored notes',
    handler: function() {
        console.log('Here are your notes...');
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a selected note',
    handler: function() {
        console.log('Reading note...');
    }
})

yargs.parse();