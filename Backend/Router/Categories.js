const express = require('express')
const Category = require('../Models/Category')
const Router = express.Router()

Router.get("/", async (req, res) => {
    const categoriesList = await Category.find();
    if (!categoriesList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoriesList)
})


Router.get("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(500).json({ message: "category with given id not found" })
    }
    res.status(200).send(category)
})


Router.post("/", async (req, res) => {
    let category = new Category({
        name: req.body.name,
        color: req.body.color
    })
    category = await category.save();
    if (!category) {
        return res.status(404).send('The category cannot be created')
    }
    res.send(category)
})


Router.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        color: req.body.color
    }, { new: true })
    if (!category) {
        return res.status(404).send('category with given id not found')
    }
    res.send(category)
})


Router.delete("/:id", (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: "category Deleted" })
        } else {
            return res.status(404).json({ success: false, message: "category not Found" })
        }
    }).catch((err) => {
        res.status(404).json({ success: false, error: err })
    })
})

module.exports = Router;