import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import AdminNav from "../../Static/AdminNav"
import axios from 'axios'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup' ;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    overflow: 'auto',
    height:500,
  };

  const Allgoods = () => {
    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false)
    const [update, setUpdate] = useState({})
    const [images, setImages] = useState('')
    const [category, setCategory] = useState('')
    const [PreviewSource, setPreviewSource] = useState('')
    const deleteProduct = (id) => {
        axios.get(`http://localhost:5000/api/deleteProduct/${id}`).then(res=>{
            if(res.data.status) {
                enqueueSnackbar(`${res.data.message}`, { variant: 'success' });
            } else {
                enqueueSnackbar(`${res.data.message}`, { variant: 'error' });
            }
        }).catch(err=> {
            setProcessing(false)
            enqueueSnackbar(`${err.message}`, { variant: 'error' });
        })
    }
    const edit = (id) => {
        setOpen(true)
        setUpdate(id)
    }
    useEffect(() => {
        setLoading(true)
      axios.get('http://localhost:5000/api/allproducts').then(res=> {
        setLoading(false)
        setProducts(res.data.message)
      }).catch(err=>{
      })
    }, [])
  const setFile = (e) => {
    const file = e.target.files[0];
    previewFile(file)
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setImages(reader.result);
    }
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  const Input = styled('input')({
    display: 'none',
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (e) =>{
    setCategory(e.target.value)
  }
    const handleClose = () => setOpen(false);
    const formik = useFormik({
        initialValues:{
            productName: '',
            productPrice: '',
            productDetails: '',
            productQuantity: '',
        },
        onSubmit(values){
          setProcessing(true)
          if (images!==''&&category!=='') {
              values.productImage = images
              values.productCategory = category
              axios.post(`http://localhost:5000/api/admin/editProduct/${update._id}`, values).then(res=> {
            setProcessing(false)
              if(res.data.status) {
                enqueueSnackbar(`${res.data.message}`, { variant: 'success' });
              } else {
                enqueueSnackbar(`${res.data.message}`, { variant: 'error' });
              }
            }).catch(err=> {
              setProcessing(false)
              enqueueSnackbar(`${err.message}`, { variant: 'error' });
            })
          } else {
            setProcessing(false)
            setProcessing(false)
            alert('Images And Product Category Has To Be Be Filled')
          }
        },
        validationSchema:Yup.object({
            productName: Yup.string().required('Field Required'),
            productPrice: Yup.string().required('Field Required'),
            productDetails: Yup.string().required('Field Required'),
            productQuantity: Yup.string().required('Field Required'),
        })
    })
  return (
    <div className="flex">
        <AdminNav/>
        <div className="border-l h-screen overflow-y-auto w-full flex flex-col justify-center items-center py-10 px-5">
            <h2 className="text-2xl font-medium text-gray-700"s>All Products</h2>
            <div className="relative overflow-x-auto shadow-md bg-white h-5/6">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {loading? (<tr>
                        <th>Loading...</th>
                    </tr>) : null}
                        {products!=''? (products.map((items, index)=>{
                            return (        
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        <img src={items.productImage} alt="Product" className="w-12 h-12 rounded-full"/>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {items.productName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {items.productQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${items.productPrice}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button onClick={()=>edit(items)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button onClick={()=>deleteProduct(items._id)} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</Button>
                                    </td>
                                </tr>
                            )
                        })) : (<tr><td>No Product Available</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }}>
            <Fade in={open}>
            <Box sx={style}>
                <Typography id="transition-modal-title">Edit Product {update._id}</Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={formik.handleSubmit} className='mt-4 flex flex-col gap-4' autoComplete='off'>
                    <span>
                        <small className="text-xs text-gray-500 ml-1">Product Name</small>
                        <TextField id="outlined-basic" fullWidth size='small' label={update.productName} variant="outlined" name='productName' onBlur={formik.handleBlur} value={formik.values.productName} onChange={formik.handleChange}/>
                        {formik.touched.productName && formik.errors.productName ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productName}</p> : null}
                    </span>
                    <span>
                        <small className="text-xs text-gray-500 ml-1">Product Quantity</small>
                        <TextField id="outlined-basic" type='number' fullWidth size='small' label={update.productQuantity} variant="outlined" name='productQuantity' onBlur={formik.handleBlur} value={formik.values.productQuantity} onChange={formik.handleChange}/>
                        {formik.touched.productQuantity && formik.errors.productQuantity ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productQuantity}</p> : null}
                    </span>
                    <span>
                    <small className="text-xs text-gray-500 ml-1">Product Price</small>
                    <FormControl fullWidth> <InputLabel htmlFor="outlined-adornment-amount">{update.productPrice}</InputLabel> <OutlinedInput name='productPrice'  id="outlined-adornment-amount" type='number' value={formik.values.productPrice} size='small' onChange={formik.handleChange} onBlur={formik.handleBlur} startAdornment={<InputAdornment position="start">$</InputAdornment>} label={update.productPrice}/></FormControl>
                    {formik.touched.productPrice && formik.errors.productPrice ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productPrice}</p> : null}
                    </span>
                    <span>
                        <small className="text-xs text-gray-500 ml-1">Product Details</small>
                        <TextField id="outlined-basic" onBlur={formik.handleBlur} rows={4} multiline fullWidth size='small' label={update.productDetails} variant="outlined" name='productDetails' value={formik.values.productDetails} onChange={formik.handleChange} type='password'/>
                        {formik.touched.productDetails && formik.errors.productDetails ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productDetails}</p> : null}
                    </span>
                    {PreviewSource?(<img src={PreviewSource} alt='Preview' style={{height: '50px', width:'50px'}}/>): <img src={update.productImage} alt='Preview' style={{height: '50px', width:'50px'}}/> }
                    <div className='flex justify-between flex-col'>
                    <label htmlFor="productImage"> <Input accept="image/*"  onChange={(e)=>setFile(e)} id="productImage" multiple type="file" /> <Button variant="outlined" component="span"> Product Image</Button> </label>
                    <span className='w-48 mt-3'>
                        <small className="text-xs text-gray-500 ml-1">Product Category</small>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{update.productCategory}</InputLabel>
                        <Select size='small' value={category} onChange={(e)=>handleChange(e)} labelId="demo-simple-select-label" id="demo-simple-select" label={update.productCategory}>
                            <MenuItem value=""> <em>None</em> </MenuItem>
                            <MenuItem value='food'>Food</MenuItem>
                            <MenuItem value='fashion'>Fashion</MenuItem>
                        </Select>
                        </FormControl>
                    </span>
                    </div>
                    {processing? <Button variant="contained" disabled > Loading... </Button> : <Button variant="contained" type='submit' name='submit'>Update Product</Button>} 
                </form>
                </Typography>
            </Box>
            </Fade>
        </Modal>
    </div>
  )
}

export default Allgoods