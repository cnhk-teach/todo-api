const express = require('express')
const Todo = require('../models/Todo')
const verifyUser =  require('../middleware/jwt')
const todoAction = express.Router()

todoAction.get('/view', verifyUser, (req, res) => {
    try {
        var userId = req.user.userId
        Todo.find({ userId: userId })
            .then((todos) => res.status(200).json(todos))
            .catch((err) => res.status(400).json({err: err}))
    } catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})

todoAction.post('/add', verifyUser, (req, res) => {
    try {
        var todoItem = new Todo({
            task: req.body.task,
            userId: req.user.userId,
            completedAt: null,
        })
        todoItem.save()
            .then(() => 
                res.status(200).json({msg: "Todo item added successfully"})
            )
            .catch((err) => 
                res.status(400).json({err: `Todo item not added, error: ${err}`})
            )
    } catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})

todoAction.patch('/completed/:todoId', verifyUser, async (req, res) => {
    try {
        var todoId = req.params.todoId
        var userTodos = await Todo.find({ userId: req.user.userId})
        if(userTodos.length == 0) {
            return res.status(404).json({msg: 'User Todo list is empty'})
        }
        var validTodo = userTodos.filter((item) => item.id == todoId)
        if(validTodo.length == 0) {
            return res.status(401).json({msg: 'User cannot modify this todo item'})
        }
        Todo.findByIdAndUpdate(validTodo[0].id, { completedAt: req.body.completedAt})
            .then(() => 
                res.status(200).json({msg: "Todo item completed!"})
            )
            .catch((err) => 
                res.status(400).json({err: `Todo item not updated, error: ${err}`})
            )
    } catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})


todoAction.delete('/delete/:todoId', verifyUser, async (req, res) => {
    try {
        var todoId = req.params.todoId
        var userTodos = await Todo.find({ userId: req.user.userId})
        if(userTodos.length == 0) {
            return res.status(404).json({msg: 'User Todo list is empty'})
        }
        var validTodo = userTodos.filter((item) => item.id == todoId)
        if(validTodo.length == 0) {
            return res.status(401).json({msg: 'User cannot delete this todo item'})
        }
        Todo.findByIdAndDelete(validTodo[0].id)
            .then(() => 
                res.status(200).json({msg: "Todo item deleted!"})
            )
            .catch((err) => 
                res.status(400).json({err: `Todo item not deleted, error: ${err}`})
            )
    } catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})

module.exports = todoAction