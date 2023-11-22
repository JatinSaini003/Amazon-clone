const express = require('express')
const mongoose = require('mongoose')
const { User } = require('../Models/User')
const Router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Get List of All Users
Router.get("/", async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList)
})


//Get a particular User
Router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({ success: false })
    }
    res.send(user)
})


//Register a New User
Router.post("/register", async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();
    if (!user) {
        return res.status(404).send('The user cannot be registered')
    }
    res.send(user)
})


//Login User
Router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.secret

    if (!user) {
        return res.status(400).send("User not found")
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
        }, secret, { expiresIn: '1d' })
        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send("Password is Wrong")
    }
})


// Update The User
Router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid User ID')
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    }, { new: true })

    if (!user) {
        return res.status(500).send('User cannot be Updated')
    }
    res.send(user)
})


//ADMIN PANEL APIs

//Create a New User (by Admin)
Router.post("/", async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();
    if (!user) {
        return res.status(404).send('The user cannot be registered')
    }
    res.send(user)
})


//Delete a User
Router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: "user Deleted" })
        } else {
            return res.status(404).json({ success: false, message: "user not Found" })
        }
    }).catch((err) => {
        res.status(404).json({ success: false, error: err })
    })
})



// Get Count of Products
Router.get("/get/count", async (req, res) => {
    const userCount = await User.countDocuments().then(count => { return count })

    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({ userCount: userCount })
})

module.exports = Router;