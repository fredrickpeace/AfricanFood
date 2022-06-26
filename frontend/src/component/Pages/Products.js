import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import Footer from "../Static/Footer"
import Nav from "../Static/Nav"
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
      axios.get('http://localhost:5000/api/allproducts').then(res=> {
        setLoading(false)
        setProducts(res.data.message)
      }).catch(err=>{
        console.log(err);
      })
    }, [])
    
  return (
    <div>
        <Helmet>
            <title>Products</title>
        </Helmet>
        <Nav/>
        <div className="h-96 bg-gray-900 flex justify-center items-center fashion_bg bg-center">
          <h1 className="text-gray-100 text-4xl tracking-widest font-medium md:mx-0 mx-7">All Products</h1>
        </div>
        <div className="p-5 mx-auto w-11/12">
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

export default Products