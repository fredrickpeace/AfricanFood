import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup' ;
import axios from 'axios'
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues:{
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit(values){
            setLoading(true)
            axios.post('http://localhost:5000/api/admin/signup', values).then(res=>{
                setLoading(false)
                if (res.data.status) {
                    enqueueSnackbar(`${res.data.message}`, { variant: 'success' }); 
                    navigate('/admin/signin')
                } else {
                    enqueueSnackbar(`${res.data.message}`, { variant: 'error' })
                }
            }).catch(err => {
                setLoading(false)
                enqueueSnackbar(`${err.message}`, { variant: 'error' })
            })
        },
        validationSchema:Yup.object({
            username: Yup.string().required('Field Required'),
            email: Yup.string().email('Invalid Email Format').required('Field Required'),
            password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password field must contain 1 uppercase, 1 lowercase, 1 number, 1 special characters and must be up to 8 characters or more").required('Field Required!'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Field Required')
        })
    })
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Helmet>
            <title>Admin Signin</title>
        </Helmet>
        <div className='xl:w-4/12 md:w-5/12 py-11 px-12'>
            <h2 className='text-2xl font-medium text-gray-700'>Register As Admin</h2>
            <form onSubmit={formik.handleSubmit} className='mt-4 flex flex-col gap-4' autoComplete='off'>
                <span>
                    <TextField id="outlined-basic" fullWidth size='small' label="Username" variant="outlined" name='username' onBlur={formik.handleBlur} value={formik.values.username} onChange={formik.handleChange}/>
                    {formik.touched.username && formik.errors.username ? <p className='text-xs text-red-700 mt-3 ml-1'>{formik.errors.username}</p> : null}
                </span>
                <span>
                    <TextField id="outlined-basic" fullWidth size='small' label="example@gmail.com" variant="outlined" name='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
                    {formik.touched.email && formik.errors.email ? <p className='text-xs text-red-700 mt-3 ml-1'>{formik.errors.email}</p> : null}
                </span>
                <span>
                    <TextField id="outlined-basic" onBlur={formik.handleBlur} fullWidth size='small' label="Password" variant="outlined" name='password' value={formik.values.password} onChange={formik.handleChange} type='password'/>
                    {formik.touched.password && formik.errors.password ? <p className='text-xs text-red-700 mt-3 ml-1'>{formik.errors.password}</p> : null}
                </span>
                <span>
                    <TextField id="outlined-basic" onBlur={formik.handleBlur} fullWidth size='small' label="Confirm Password" variant="outlined" name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} type='password'/>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='text-xs text-red-700 mt-3 ml-1'>{formik.errors.confirmPassword}</p> : null}
                </span>
                {loading? <Button fullWidth variant="contained" > Loading... </Button> : <Button variant="contained" type='submit' name='submit' fullWidth>Register</Button>}
                <p>
                    <span className='text-sm text-gray-700'>Already have and account?<a className='hover:underline' href='/admin/signin'>Login</a></span>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signup