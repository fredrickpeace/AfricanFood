const {cloudinary} = require('../../utils/cloudinary')
const productModel = require('../../Models/productSchema');
const AddProduct = async (req,res) => {
    try {
        fileStr = req.body.productImage;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'productImages'
        })
        let {productName, productPrice, productQuantity, productDetails, productCategory} = req.body;
        let productImage = uploadedResponse.url
        const addproduct = new productModel({productName, productImage, productPrice, productQuantity, productDetails, productCategory})
        addproduct.save((err) => {
            if (!err) { 
                res.json({message: 'Product Added', status: true})
            } else {
                res.json({message: err.message, status: false})
            }
        })
    } catch (error) {
        res.send({message: error.message, status: false})
    }
}
module.exports = {AddProduct}  