const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName:{
        type: String,
        require:true,
    },
    productImage: {
        type: String,
        require:true,
    },
    productQuantity: {
        type: String,
        require: true,
    },
    productPrice: {
        type: String,
        require: true,
    },
    productDetails: {
        type: String,
        require: true,
    },
    productCategory: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema)
module.exports = productModel;