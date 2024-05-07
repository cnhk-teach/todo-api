require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:4200',
   optionSuccessStatus:200,
}

const signup = require('./src/routes/signup')
const login = require('./src/routes/login')
const todoAction = require('./src/routes/todoAction')

const api = express()
api.use(express.json())
api.use(cors(corsOptions))

const PORT = process.env.PORT || 3000;

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
