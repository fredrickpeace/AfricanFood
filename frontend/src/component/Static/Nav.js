import { Link } from "react-router-dom"
const Nav = () => {
  return (
    <nav className="bg-gray-100 sm:bg-white fixed sm:sticky bottom-0 sm:top-0 w-full sm:px-10 px-7 sm:py-0 py-3 shadow border-t-1.5 border-gray-900 z-20">
        <div className="sm:flex justify-between items-center hidden">
            <ul className="text-gray-700 flex gap-3 text-sm">
                <Link to='/'><li>Home</li></Link>
                <Link to='/products'><li>Products</li></Link>
                <Link to='/contact'><li>Contact</li></Link>
            </ul>
            <span>
                <Link to='/'><img src="/logo.png" alt="" className="h-24"/></Link>
            </span>
            <span className="flex gap-6 items-center text-gray-700">
                <Link to='/products/food'>Food</Link>
                <Link to='/products/fashion'>Fashion</Link>
            </span>
        </div>
        <div className="sm:hidden justify-around items-center flex">
            <Link to='/' className="flex flex-col justify-center items-center">
                <img src="/assets/icons/home.png" className="w-6 h-6" alt=""/>
                <p className="text-xs mt-0.5 text-gray-600">Home</p>
            </Link>
            <Link to='/products' className="flex flex-col justify-center items-center">
                <img src="/assets/icons/products.png" className="w-6 h-6" alt=""/>
                <p className="text-xs mt-0.5 text-gray-600">Products</p>
            </Link>
        </div>
    </nav>
  )
}
export default Nav