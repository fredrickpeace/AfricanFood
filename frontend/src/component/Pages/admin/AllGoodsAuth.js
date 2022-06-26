import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Allgoods from './Allgoods'
const AllGoodsAuth = () => {
  let token = localStorage.africanfood_adminToken
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [component, setComponent] = useState("")
  useEffect(() => {
    if(!token){
      navigate('/')
    }
    setComponent(<small>Loading</small>);
    const verify = async () =>{
      await axios.get('http://localhost:5000/api/auth', {headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept':'application/json'
      }}).then((res)=>{
        if(res.data.status){
          dispatch({type:"SET_USER", payload:{email:res.data.email}})
          setComponent(<Allgoods/>)
        }else{
            navigate('/admin/signin')
            localStorage.removeItem('africanfood_adminToken')
        }
      }).catch(err =>{
          setComponent(<span>An error occured, please check your internet connection</span>)
      })
    }
    verify();
  }, [token,navigate, dispatch])
  
  return (
    <>
      {component}
    </>
  )
}

export default AllGoodsAuth