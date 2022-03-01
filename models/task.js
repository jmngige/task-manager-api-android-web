const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add task title"]
    },
    description: {
        type: String,
        required: [true, "Please add course description"]
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Task", taskSchema)

