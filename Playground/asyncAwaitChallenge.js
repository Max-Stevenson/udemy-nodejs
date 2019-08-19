require('../task-manager/src/db/mongoose');
const Task = require('../task-manager/src/models/task');

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({compleated: false});
    return count;
}

deleteTaskAndCount('5d582e464296fe3f03055ce7').then((count) => {
    console.log(count);
});