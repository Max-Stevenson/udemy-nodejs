require('../task-manager/src/db/mongoose');
const Task = require('../task-manager/src/models/task');

Task.findByIdAndDelete('5d59b0de6e4bdf46a2cebd3f').then((task) => {
    return Task.countDocuments({compleated: false});
}).then((result) => {
    console.log(result);
}).catch((err) => {})