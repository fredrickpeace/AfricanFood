const productModel = require("../Models/productSchema")
const {cloudinary} = require('../utils/cloudinary')
const AllProducts = (req,res) => {
    productModel.find({}, (err,result) => {
        if(err) {
            res.json({message:err.message, status:false})
        } else {
            res.json({message:result, status:true})
        }
    })
}
const Product = (req,res) => {
    productModel.findOne({_id:req.params.id}, (err,result) => {
        if(err) {
            res.json({message:err.message, status:false})
        } else {
            res.json({message:result, status:true})
        }
    })
}
const foodCategory = (req,res) => {
    productModel.find({productCategory:'food'}, (err,result) => {
        if(err) {
            res.json({message:err.message, status:false})
        } else {
            res.json({message:result, status:true})
        }
    })
}
const fashionCategory = (req,res) => {
    productModel.find({productCategory:'fashion'}, (err,result) => {
        if(err) {
            res.json({message:err.message, status:false})
        } else {
            res.json({message:result, status:true})
        }
    })
}
const deleteProduct = (req,res) => {
    productModel.deleteOne({_id:req.params.id}, (err,result) => {
        if(err) {
            res.json({message:err.message, status:false})
        } else {
            res.json({message:result, status:true})
        }
    })
}
const editProduct = async (req,res) => {
    try {
        fileStr = req.body.productImage;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'productImages'
        })
        let {productName, productPrice, productQuantity, productDetails, productCategory} = req.body;
        let productImage = uploadedResponse.url
        productModel.findOneAndUpdate({_id:req.params.id},{productName, productImage, productPrice, productQuantity, productDetails, productCategory}, (err,result) => {
            if(err) {
                res.json({message:err.message, status:false})
            } else {
                res.json({message: 'Updated Successfully', status:true})
            }
        })
    } catch (error) {
        res.send({message: error.message, status: false})
    }
}
module.exports={AllProducts,Product, foodCategory, fashionCategory, deleteProduct, editProduct}