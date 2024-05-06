const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const login = express.Router()

login.post('/login', async (req, res) => {
    try {
        const validUser = await User.findOne({email: req.body.email})
        if (!validUser) {
            return res.status(404).send('User not exist')
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, validUser.password)
        if(!isPasswordValid){
            return res.status(400).send('Invalid password')
        }
        res.status(200).json({msg: `User: ${validUser.username} logged in successfully`})
    } catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})

module.exports = login