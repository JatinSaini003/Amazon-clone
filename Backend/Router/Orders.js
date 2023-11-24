const express = require('express')
const Order = require('../Models/Order')
const OrderItem = require('../Models/OrderItem')
const Router = express.Router()

Router.get("/", async (req, res) => {
    const orderList = await Order.find().populate('user', 'name email').sort('dateOrdered');

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList)
})

Router.get("/:id", async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email')
        .populate({ path: 'orderItem', model: OrderItem, populate: { path: 'product', select: 'name brand price category' } });

    if (!order) {
        res.status(500).json({ success: false })
    }
    res.send(order)
})

Router.post("/", async (req, res) => {
    const orderItemIds = Promise.all(req.body.orderItem.map(async Item => {
        let newOrderItem = new OrderItem({
            quantity: Item.quantity,
            product: Item.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    const orderItemIdsResolved = await orderItemIds;

    const totalPrice = await Promise.all(orderItemIdsResolved.map(async orderItemIds => {
        const orderItem = await OrderItem.findById(orderItemIds).populate('product', 'price')
        const totalPrices = orderItem.product.price * orderItem.quantity
        return totalPrices
    }))
    const Price = totalPrice.reduce((a, b) => a + b, 0)

    let order = new Order({
        orderItem: orderItemIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: Price,
        user: req.body.user,
    })
    order = await order.save();
    if (!order) {
        return res.status(404).send('The order cannot be created')
    }
    res.send(order)
})

Router.put("/:id", async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true })
    if (!order) {
        return res.status(404).send('order with given id not found')
    }
    res.send(order)
})

Router.delete("/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(order => {
        if (order) {
            order.orderItem.map(async orderitem => {
                await OrderItem.findByIdAndDelete(orderitem)
            })
            return res.status(200).json({ success: true, message: "order Deleted" })
        } else {
            return res.status(404).json({ success: false, message: "order not Found" })
        }
    }).catch((err) => {
        res.status(404).json({ success: false, error: err })
    })
})



//Admin Panel APIs

//Get Total Sales of Orders
Router.get('/get/totalsales', async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])

    if (!totalSales) {
        res.status(400).send('The order sales cannot be generated')
    }
    res.send({ totalSales: totalSales })
})


// Get Count of Orders
Router.get("/get/count", async (req, res) => {
    const orderCount = await Order.countDocuments().then(count => { return count })

    if (!orderCount) {
        res.status(500).json({ success: false })
    }
    res.send({ orderCount: orderCount })
})


Router.get("/get/userorders/:userid", async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userid })
        .populate({ path: 'orderItem', model: OrderItem, populate: { path: 'product', select: 'name brand price category' } })
        .sort('dateOrdered');

    if (!userOrderList) {
        res.status(500).json({ success: false })
    }
    res.send(userOrderList)
})


module.exports = Router;