const express = require('express')
const Todo = require('../models/Todo')
const todoAction = express.Router()

todoAction.get('/view', (_req, res) => {
    try {
        Todo.find()
            .then((todos) => res.status(200).json(todos))
            .catch((err) => res.status(400).json({err: err}))
    } catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})

module.exports = todoAction