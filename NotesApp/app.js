const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is Max\n');
fs.appendFileSync('notes.txt', 'This challenge was pretty easy');
fs.appendFileSync('notes.txt', 'git gud son');
