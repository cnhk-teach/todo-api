require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const signup = require('./src/routes/signup')
const login = require('./src/routes/login')
const todoAction = require('./src/routes/todoAction')

const api = express()
api.use(express.json())
const PORT = process.env.PORT || 2323;

// Connnect to MongoDb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        // Start your server after successful MongoDB connection
        api.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

api.use('/', signup)
api.use('/', login)
api.use('/todo', todoAction)

api.get('/helloworld', (_req, res) => {
    res.send('Hello world!')
})
