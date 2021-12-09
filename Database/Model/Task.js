const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskId: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    creatorId: {
        type: String,
        required: true
    },
    isTaskClaimed: {
        type: Boolean,
        required: true
    },
    claimingUserId: {
        type: String,
        required: false
    },
    isTaskDone: {
        type: Boolean,
        required: true
    },
    isTaskCleared: {
        type: Boolean,
        required: true
    }
});

const Task = mongoose.model('Task',taskSchema)

module.exports = {Task}
