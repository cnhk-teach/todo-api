const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const signup = express.Router()

signup.post('/signup', async (req, res) => {
    try {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        })

        newUser.save()
            .then(() => 
                res.status(201).json({ msg: "User registered successfully"})
            )
            .catch((err) => 
                res.status(400).json({err: `User not registered, error: ${err}`})
            )
    }
    catch (err) {
        res.status(500).json({err: 'Internal server error: '+ err })
    }
})

module.exports = signup