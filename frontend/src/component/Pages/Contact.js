import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Helmet } from "react-helmet-async"
import Footer from "../Static/Footer"
import Nav from "../Static/Nav"

const Contact = () => {
  return (
    <div>
        <Helmet>
            <title>Contact Us</title>
        </Helmet>
        <Nav/>
        <div className="h-96 bg-gray-900 flex justify-center items-center">
          <h1 className="md:text-5xl text-3xl font-medium text-white tracking-widest">Contact Us</h1>
        </div>
        <div className="bg-white shadow mx-auto md:w-3/6 w-11/12 mb-10 rounded h-96 flex justify-center items-center" id="contact">
          <div className='w-4/5 flex flex-col justify-center gap-6'>
            <TextField id="demo-helper-text-misaligned-no-helper" size='small' fullWidth label="Name" />
            <TextField id="demo-helper-text-misaligned-no-helper" size='small' fullWidth label="Email Address" />
            <TextField id="outlined-multiline-static" label="Enter your message" size='small' multiline rows={4} />
            <Button variant="contained" size='large' fullWidth>Submit Message</Button>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact