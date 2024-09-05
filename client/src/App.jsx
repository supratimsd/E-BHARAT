import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route,  Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Order from './pages/Order'
import DashBoard from './pages/admin/DashBoard'
import NoPage from './pages/NoPage'
import MyState from './context/data/MyState'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProductInfo from './pages/ProductInfo'
import AddProduct from './pages/admin/pages/AddProduct'
import UpdateProduct from './pages/admin/pages/UpdateProduct'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/AllProducts'
function App() {
  
  

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />}/>
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }/>
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <DashBoard />
            </ProtectedRouteForAdmin>
          }/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/productinfo/:id' element={<ProductInfo/>}/>
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          }/>
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          }/>
          <Route path="/*" element={<NoPage />}/>
          
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App


export const ProtectedRoute = ({children}) => {
  const user=localStorage.getItem('user')

  if(user){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}


export const ProtectedRouteForAdmin=({children})=>{
  const admin=JSON.parse(localStorage.getItem('user'))

  if(admin.user.email==='deysupratim72@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}