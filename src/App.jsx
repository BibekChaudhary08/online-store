import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import HomePage from './pages/homepage/HomePage'
import Signup from './pages/signup/Signup'
import MyState from './context/MyState'
import Toaster from 'react-hot-toast'
import ProtectedRouteforAdmin from './components/protectedroute/ProtectedRouteforAdmin'
import ProtectedRouteforUser from './components/protectedroute/ProtectedRouteforUser'
import EditProductPage from './pages/editProduct/EditProduct'
import AddProductPage from './pages/addproduct/AddProductPage'
import ProductInfo from './pages/productinfo/ProductInfo'
import CartItemPage from './pages/cartItem/CartItemPage'
import BuyNow from './pages/buynow/BuyNow'
import AdminDashboard from './pages/dashboard/admindashboard/AdminDashboard'
import UserDashboard from './pages/dashboard/userdashboard/UserDashboard'
const App = () => {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path='/' element= {<HomePage />} />
        <Route path='/login' element= {<Login />}/> 
        <Route path='/signup' element= {<Signup />} />
        <Route path='/pages/productinfo/:id' element={<ProductInfo />} />

        <Route path='/pages/dashboard/adminDashboard' element= {
          <ProtectedRouteforAdmin>
             <AdminDashboard />
          </ProtectedRouteforAdmin>
          }/>

        <Route path='/pages/dashboard/userdashboard' element= {
          <ProtectedRouteforUser>
             <UserDashboard />
          </ProtectedRouteforUser>   
          }/>

        <Route path='/pages/cartitem' element= {
          <ProtectedRouteforUser>
             <CartItemPage />
          </ProtectedRouteforUser>   
          }/>  

          <Route path='/pages/buynow' element= {
          <ProtectedRouteforUser>
             <BuyNow />
          </ProtectedRouteforUser>   
          }/>   

        <Route path='/pages/addproduct' element= {
          <ProtectedRouteforAdmin>
             <AddProductPage />
          </ProtectedRouteforAdmin>   
          }/>  

        <Route path='/pages/editproduct/:id' element= {
          <ProtectedRouteforAdmin>   
             <EditProductPage />
          </ProtectedRouteforAdmin>   
          }/>

      </Routes>
      <Toaster />
    </Router>
    </MyState>
  )
}

export default App