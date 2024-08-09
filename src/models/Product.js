// src/models/Product.js
const mongoose = require("mongoose");

// Product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;