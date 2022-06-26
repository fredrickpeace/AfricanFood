import { useEffect, useState } from "react"
import Nav from "../Static/Nav"
import { Helmet } from "react-helmet-async"
import Footer from "../Static/Footer"
import axios from 'axios'
import { Link } from "react-router-dom"

const Landing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
      axios.get('http://localhost:5000/api/allproducts').then(res=> {
        setLoading(false)
        setProducts(res.data.message)
      }).catch(err=>{
        setLoading(false)
        alert('Network Error')
      })
    }, [])
  return (
    <div>
        <Helmet>
            <title>African Foods - San Diego</title>
        </Helmet>
        <Nav/>
        <div className="h-96 bg-gray-900 hero_bg flex">
            <h1 className="text-white text-4xl font-medium my-auto lg:px-20 px-5 w-5/6 sm:w-2/4 md:w-2/4 xl:w-2/6">Welcome To African Foods San Diego</h1>
        </div>
        <div className="mt-5 mx-auto w-11/12 py-5">
            <h1 className="text-3xl text-gray-800 my-5">Popular Category</h1>
            <div className="flex flex-wrap justify-between pt-5 sm:gap-0 gap-8">
                <Link to='/products/food' className="sm:w-2/5 w-full">
                    <div className="w-full h-60 bg-gray-500 rounded flex bg-center bg-no-repeat justify-center items-center text-4xl text-white cursor-pointer font-semibold tracking-widest" id="food_bg">Food</div>
                </Link>
                <Link to='/products/fashion' className="sm:w-2/5 w-full">
                    <div className="w-full h-60 bg-gray-500 rounded flex bg-center bg-no-repeat justify-center items-center text-4xl text-white cursor-pointer font-semibold tracking-widest" id="fashion_bg">Fashion</div>
                </Link>
            </div>
        </div>
        <div className="mt-12 p-5 mx-auto w-11/12">
            <h2 className="text-center text-3xl">More To Love</h2>
            <div className="w-full p-10 flex flex-wrap items-center justify-between gap-10">
                {loading? (<div>Loading...</div>) : null}
                    {products!=''? (products.map((items, index)=>{
                    return (
                    <Link key={index} to={`/itemDetails/${items._id}`} className="sm:w-5/12 xl:w-2/12 md:w-3/12 w-full bg-gray-100 rounded">
                        <div className="w-full h-44 bg-gray-500 rounded-t">
                            <img src={items.productImage} className='w-full object-cover min-h-full max-h-full md:mx-h-44' alt="Product"/>
                        </div>
                        <div className="px-2 py-2">
                            <small>{items.productName}</small>
                            <p className="mt-1"><small>$</small><span className="font-medium ml-0.5">{items.productPrice}</span></p>
                        </div>
                    </Link>
                    )
                })) : (<div>No Product Available</div>)}
            </div>
        </div>
        <Footer/>
    </div>
  )
}
export default Landing