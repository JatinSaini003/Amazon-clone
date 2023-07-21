const express = require('express')
const Router = express.Router()

Router.get("/", (req, res) => {
    res.send("Hello server")
})

Router.get("/products", (req, res) => {
    res.send("Products page")
})

module.exports = Router