const express = require('express')
const mongoose = require('mongoose')
const Product = require('../Models/Product')
const Category = require('../Models/Category')
const Router = express.Router()


Router.get("/", async (req, res) => {
    let filter = {};
    if (req.query.Categories) {
        filter = { category: req.query.categories.split(',') }
    }

    const productList = await Product.find(filter).populate("category")

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList)
})

Router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(500).json({ success: false })
    }
    res.send(product)
})

Router.post("/", async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    var product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rate: req.body.rate,
        rateCount: req.body.rateCount,
        isTrending: req.body.isTrending,
        dateAdded: req.body.dateAdded,
    })
    product = await product.save()
    if (!product) {
        return res.status(500).send('Product cannot be created')
    }
    res.send(product)
})

Router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product ID')
    }

    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rate: req.body.rate,
        rateCount: req.body.rateCount,
        isTrending: req.body.isTrending,
        dateAdded: req.body.dateAdded,
    }, { new: true })

    if (!product) {
        return res.status(500).send('Product cannot be Updated')
    }
    res.send(product)
})

Router.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: "Product Deleted" })
        } else {
            return res.status(404).json({ success: false, message: "Product not Found" })
        }
    }).catch((err) => {
        res.status(404).json({ success: false, error: err })
    })
})


//ADMIN PANEL API -------------------------------------------------------------------------------------

// Get Count of Products
Router.get("/get/count", async (req, res) => {
    const productCount = await Product.countDocuments().then(count => { return count })

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({ ProductCount: productCount })
})

//Get Trending Products
Router.get("/get/trending", async (req, res) => {
    const products = await Product.find({ isTrending: true })

    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products)
})

// Get Limited Trending Products
Router.get("/get/trending/:count", async (req, res) => {
    let count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isTrending: true }).limit(+count)

    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products)
})

module.exports = Router