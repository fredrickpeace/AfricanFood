import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './component/Pages/Landing';
import Products from './component/Pages/Products';
import Contact from './component/Pages/Contact';
import Signup from './component/Pages/admin/Signup';
import Signin from './component/Pages/admin/Signin';
import { SnackbarProvider } from 'notistack';
import {createStore} from "redux"
import userReducer from './store/Store';
import {Provider} from "react-redux";
import AddgoodsAuth from './component/Pages/admin/AddgoodsAuth';
import AllGoodsAuth from './component/Pages/admin/AllGoodsAuth';
import Item from './component/Pages/Item';
import FoodCategory from './component/Pages/FoodCategory';
import FashionCategory from './component/Pages/FashionCategory';
const userStore = createStore(userReducer)

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/itemDetails/:id' element={<Item/>}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/products/food' element={<FoodCategory/>}></Route>
          <Route path='/products/fashion' element={<FashionCategory/>}></Route>
          <Route path='/admin/signup' element={<Signup/>}></Route>
          <Route path='/admin/signin' element={<Signin/>}></Route>
          <Route path='/admin/allgoods' element={<Provider store={userStore}><AllGoodsAuth/></Provider>}></Route>
          <Route path='/admin/addgoods' element={<Provider store={userStore}><AddgoodsAuth/></Provider>}></Route>
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
