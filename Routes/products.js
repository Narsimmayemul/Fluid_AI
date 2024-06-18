const express = require('express');
const authentication = require('../auth/authentication');
const { ProductModule } = require('../connection/connection');
const router = express.Router();

router.get("/",authentication, async (req, res) => {
    try {
        const data = await ProductModule.find();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error From Get Function: " + error.message);
    }
});

router.get("/:id", authentication, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModule.findById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error From Get By ID Function: " + error.message);
    }
});

router.post("/add", authentication, async (req, res) => {
    const { title, description, duedate, priority, status } = req.body;
    try {
        const data = await ProductModule.create({ title, description, duedate, priority, status });
        res.status(200).send("data posted: " + data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error From add Function: " + error.message);
    }
});

router.put("/:id", authentication, async (req, res) => {
    const { id } = req.params;
    const { title, description, duedate, priority, status } = req.body;
    try {
        const updatedProduct = await ProductModule.findByIdAndUpdate(
            id,
            { title, description, duedate, priority, status },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send("Product updated: " + updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error From put Function: " + error.message);
    }
});

router.delete("/:id", authentication, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await ProductModule.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send("Product deleted: " + deletedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error From delete Function: " + error.message);
    }
});

module.exports = router;
