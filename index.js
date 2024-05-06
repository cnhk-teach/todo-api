const express = require('express')
const mongoose = require('mongoose');

const api = express()

// Connnect to MongoDb
mongoose.connect('mongodb+srv://harish:root@cnhk-teach-db.zpoered.mongodb.net/todo')
    .then(() => {
        console.log("Connected to MongoDB");
        // Start your server after successful MongoDB connection
        api.listen(2323, ()=>{
            console.log("Hello world!")
            console.log("API Server is up and running in port: 2323");
        })
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });


api.get('/', (req, res) => {
    res.send('Hello world!')
})
