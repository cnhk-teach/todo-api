const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const login = express.Router()
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'yuyughrbgekbgjkebjldsfdjbsdbvlsdhsgdhbdsbfbvdhvj'

login.post('/login', async (req, res) => {
    try {
        const validUser = await User.findOne({email: req.body.email})
        if (!validUser) {
            return res.status(404).json({msg: 'User not exist'})
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, validUser.password)
        if(!isPasswordValid){
            return res.status(400).json({msg: 'Invalid password'})
        }
        const token = jwt.sign({userId: validUser.id, username: req.body.username}, SECRET_KEY)
        res.status(200).json({msg: `User: ${validUser.username} logged in successfully`, token: token})
    } catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})

module.exports = login