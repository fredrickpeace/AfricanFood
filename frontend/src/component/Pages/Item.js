import { Button } from "@mui/material"
import { Helmet } from "react-helmet-async"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Nav from "../Static/Nav"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const Item = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const params = useParams()
    const {id} = params
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/product/${id}`).then(res=> {
            setLoading(false)
            if (res.data.status) {
                setProduct(res.data.message)
            } else {
                setProduct('Product Not Found')
            }
        }).catch(err=>{
            alert(err.message)
        })
    }, [id])
    const geturl = () => {
        let currentPage = window.location.href;
        window.open(`https://wa.me/7084998494?text=I%20Would%20Like%20To%20Chat%20You%20Up%20About%20This%20Product%20${currentPage}!`,'_blank')
    }
  return (
    <div>
        <Helmet>
            <title>Product Detail</title>
        </Helmet>
        <Nav/>
        <div className="py-10 px-5 mb-10 flex flex-col md:flex-row md:justify-start gap-5 justify-around items-center">
            {loading? <div>Loading...</div>: null}
            {product!='Product Not Found'&&product!=''?(<><div className="bg-gray-200 md:h-96 h-56 md:w-6/12 xl:w-5/12 w-full">
                <img src={product.productImage} onClick={handleOpen} className='w-full object-cover min-h-full max-h-full md:mx-h-44' alt="Product"/>
            </div>
            <div className="md:w-5/12 xl:w-4/12 py-5 w-full px-5">
                <h1 className="font-medium text-sm text-gray-700 capitalize">{product.productName}</h1>
                <p className="text-xs font-medium text-gray-700 mt-3">${product.productPrice}</p>
                <p className="text-xs text-gray-700 mt-2">Quantity {product.productQuantity}</p>
                <p className="mt-2 text-xs text-gray-700 mt-2">{product.productDetails}</p>
                <div className="mt-5">
                    <Button onClick={geturl} variant="contained" startIcon={<WhatsAppIcon />}>WhatsApp</Button>
                </div>
            </div>
            </>) : (<div>Product Not found</div>)}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img src={product.productImage} className='w-full h-full' alt="Product"/>
                </Box>
            </Modal>
        </div>
    </div>
  )
}

export default Item