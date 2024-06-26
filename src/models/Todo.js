const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        index: true
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo