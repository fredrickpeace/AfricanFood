import { Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const AdminNav = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('africanfood_adminToken')
        navigate('/admin/signin')
    }
  return (
    <>
        <nav className="hidden md:flex h-screen flex-col py-10 justify-between">
            <Link to='/admin/dashboard'>
                <img src="/logo.png" className="h-20 px-7" alt="Logo"/>
            </Link>
            <span className="flex flex-col gap-5 px-3">
                <Link to='/admin/allgoods' className='text-gray-500 px-3 py-2 text-sm flex items-center active:text-gray-800'><Inventory2OutlinedIcon fontSize='small' /><span className='ml-3 whitespace-nowrap'>All Goods</span></Link>
                <Link to='/admin/addgoods' className='text-gray-500 px-3 py-2 text-sm flex items-center active:text-gray-800'><AddBoxOutlinedIcon fontSize='small' /><span className='ml-3 whitespace-nowrap'>Add Goods</span></Link>
            </span>
            <span className="px-3">
                    <Button onClick={logout} className='text-gray-500 px-3 py-2 text-sm flex items-center active:text-gray-800'><LogoutOutlinedIcon fontSize='small' /><span className='ml-3 whitespace-nowrap'>Logout</span></Button>
            </span>
        </nav>
        <nav className="flex justify-around z-40 md:hidden fixed bottom-0 bg-white py-3 w-full">
            <Link to='/admin/allgoods' className='text-gray-500 px-3 py-2 text-sm flex items-center active:text-gray-800' size='small'><Inventory2OutlinedIcon fontSize='medium' /></Link>
            <Link to='/admin/addgoods' className='text-gray-500 px-3 py-2 text-sm flex items-center active:text-gray-800' size='small'><AddBoxOutlinedIcon fontSize='medium' /></Link>
            <Button onClick={logout} className='text-gray-500 px-3 py-2 text-sm flex items-center active:text-gray-800' size='small'><LogoutOutlinedIcon fontSize='medium' /></Button>
        </nav>
    </>
  )
}

export default AdminNav