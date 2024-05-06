const express = require('express')

const api = express()

api.get('/', (req, res) => {
    res.send('Hello world!')
})

api.listen(2323, ()=>{
    console.log("Hello world!")
    console.log("API Server is up and running in port: 2323");
})
