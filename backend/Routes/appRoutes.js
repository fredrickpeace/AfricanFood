const express = require('express');
const { AddProduct } = require('../Controller/admin/AddGoodsController');
const router = express.Router();
const { Auth } = require('../Controller/admin/AuthController');
const { signup,signin } = require('../Controller/admin/SignupAndSignin');
const { AllProducts, Product, foodCategory, fashionCategory, deleteProduct, editProduct } = require('../Controller/AllProducts');

router.post('/admin/signup', signup);
router.post('/admin/signin', signin);
router.get('/auth', Auth);
router.post('/admin/addproduct', AddProduct);
router.get('/allproducts', AllProducts);
router.get('/deleteProduct/:id', deleteProduct);
router.post('/admin/editProduct/:id', editProduct);
router.get('/product/:id', Product);
router.get('/foodcategory', foodCategory);
router.get('/fashioncategory', fashionCategory);
module.exports = router;