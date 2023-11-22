const express = require('express')
const Order = require('../Models/Order')
const Router = express.Router()

Router.get("/", async (req, res) => {
    const orderList = await Order.find();

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList)
})

module.exports = Router;