import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup' 
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Format').required('Field Required'),
        password: Yup.string().required('Field Required!'),
    })
    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit(values){
            setLoading(true)
            axios.post('http://localhost:5000/api/admin/signin', values).then(res=>{
                if (res.data.status===true) {
                    setLoading(false)
                    enqueueSnackbar(`${res.data.message}`, { variant: 'success' }); 
                    const user_token = res.data.token
                    localStorage.setItem('africanfood_adminToken', user_token)
                    navigate('/admin/allgoods');
                } else if (res.data.status===false) {
                    setLoading(false)
                    enqueueSnackbar(`${res.data.message}`, { variant: 'error' });
                } else if (res.data.err) {
                    setLoading(false)
                    enqueueSnackbar(`${res.data.err}`, { variant: 'error' });
                }
            }).catch(err => {
                setLoading(false)
                enqueueSnackbar(`${err.message}`, { variant: 'error' });
            })
        }
    })
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Helmet>
            <title>Admin Signin</title>
        </Helmet>
        <div className='xl:w-4/12 md:w-5/12 py-11 px-12'>
            <h2 className='text-2xl font-medium text-gray-700'>Signin As Admin</h2>
            <form onSubmit={formik.handleSubmit} className='mt-4 flex flex-col gap-4' autoComplete='off'>
                <span>
                    <TextField id="outlined-basic" fullWidth size='small' label="example@gmail.com" variant="outlined" name='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
                    {formik.touched.email && formik.errors.email ? <p className='text-xs text-red-700 mt-3 ml-1'>{formik.errors.email}</p> : null}
                </span>
                <span>
                    <TextField id="outlined-basic" onBlur={formik.handleBlur} fullWidth size='small' label="Password" variant="outlined" name='password' value={formik.values.password} onChange={formik.handleChange} type='password'/>
                    {formik.touched.password && formik.errors.password ? <p className='text-xs text-red-700 mt-3 ml-1'>{formik.errors.password}</p> : null}
                </span>
                {loading ? <Button fullWidth variant="contained" disabled> Loading... </Button> : <Button variant="contained" type='submit' name='submit' fullWidth>Signin</Button>}
                <p>
                    <span className='text-sm text-gray-700'>Don't have and account?<a className='hover:underline' href='/admin/signup'> Signup</a></span>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signin