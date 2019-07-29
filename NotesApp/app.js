const getNotes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

const msg = getNotes()

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function() {
        console.log('Adding a new note!')
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing note...')
    }
})

yargs.command({
    command: 'list',
    describe: 'Lists all stored notes',
    handler: function() {
        console.log('Here are your notes...')
    }
})

yargs.command({
    command: 'Read',
    describe: 'Read a selected note',
    handler: function() {
        console.log('Reading note...')
    }
})

console.log(yargs.argv);