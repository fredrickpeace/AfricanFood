import {useState} from 'react'
import AdminNav from "../../Static/AdminNav"
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup' ;
import { styled } from '@mui/material/styles';
import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import axios from "axios";
const Addgoods = () => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState('')
  const [category, setCategory] = useState('')
  const [PreviewSource, setPreviewSource] = useState('')
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
    const formik = useFormik({
        initialValues:{
            productName: '',
            productPrice: '',
            productDetails: '',
            productQuantity: '',
        },
        onSubmit(values){
          setLoading(true)
          if (images!==''&&category!=='') {
            values.productImage = images
            values.productCategory = category
            axios.post('http://localhost:5000/api/admin/addproduct', values).then(res=> {
              setLoading(false)
              if(res.data.status) {
                enqueueSnackbar(`${res.data.message}`, { variant: 'success' });
              } else {
                enqueueSnackbar(`${res.data.message}`, { variant: 'error' });
              }
            }).catch(err=> {
              setLoading(false)
              enqueueSnackbar(`${err.message}`, { variant: 'error' });
            })
          } else {
            setLoading(false)
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
        <div className="bg-white border-l h-screen overflow-y-auto w-full flex justify-center items-center">
        <div className='xl:w-5/12 md:w-7/12 md:py-10 md:mt-40 py-24 px-12 xl:mt-0 mt-16'>
            <h2 className='text-2xl font-medium text-gray-700'>Add Product</h2>
            <form onSubmit={formik.handleSubmit} className='mt-4 flex flex-col gap-4' autoComplete='off'>
                <span>
                    <TextField id="outlined-basic" fullWidth size='small' label="Product Name" variant="outlined" name='productName' onBlur={formik.handleBlur} value={formik.values.productName} onChange={formik.handleChange}/>
                    {formik.touched.productName && formik.errors.productName ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productName}</p> : null}
                </span>
                <span>
                    <TextField id="outlined-basic" type='number' fullWidth size='small' label="Product Quantity" variant="outlined" name='productQuantity' onBlur={formik.handleBlur} value={formik.values.productQuantity} onChange={formik.handleChange}/>
                    {formik.touched.productQuantity && formik.errors.productQuantity ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productQuantity}</p> : null}
                </span>
                <span>
                <FormControl fullWidth> <InputLabel htmlFor="outlined-adornment-amount">Product Price</InputLabel> <OutlinedInput name='productPrice'  id="outlined-adornment-amount" type='number' value={formik.values.productPrice} size='small' onChange={formik.handleChange} onBlur={formik.handleBlur} startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Product productPrice"/></FormControl>
                {formik.touched.productPrice && formik.errors.productPrice ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productPrice}</p> : null}
                </span>
                <span>
                    <TextField id="outlined-basic" onBlur={formik.handleBlur} rows={4} multiline fullWidth size='small' label="Product Details" variant="outlined" name='productDetails' value={formik.values.productDetails} onChange={formik.handleChange} type='password'/>
                    {formik.touched.productDetails && formik.errors.productDetails ? <p className='text-xs text-red-700 mt-1 ml-1'>{formik.errors.productDetails}</p> : null}
                </span>
                {PreviewSource && (
                  <img src={PreviewSource} alt='Preview' style={{height: '200px'}}/>
                )}
                <div className='flex justify-between flex-col xl:flex-row'>
                  <label htmlFor="productImage"> <Input accept="image/*"  onChange={(e)=>setFile(e)} id="productImage" multiple type="file" /> <Button variant="outlined" component="span"> Product Image</Button> </label>
                  <span className='w-48 xl:mt-0 mt-3'>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                      <Select size='small' value={category} onChange={(e)=>handleChange(e)} labelId="demo-simple-select-label" id="demo-simple-select" label="Product Category">
                        <MenuItem value=""> <em>None</em> </MenuItem>
                        <MenuItem value='food'>Food</MenuItem>
                        <MenuItem value='fashion'>Fashion</MenuItem>
                      </Select>
                    </FormControl>
                  </span>
                </div>
                {loading? <Button variant="contained" disabled > Loading... </Button> : <Button variant="contained" type='submit' name='submit'>Add Product</Button>} 
            </form>
        </div>
        </div>
    </div>
  )
}

export default Addgoods