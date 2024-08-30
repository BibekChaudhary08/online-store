import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import HomePage from './pages/homepage/HomePage'
import Signup from './pages/signup/Signup'
import MyState from './context/MyState'
import Toaster from 'react-hot-toast'
import AdminDashboard from './pages/dashboard/adminDashboard'
import UserDashboard from './pages/dashboard/UserDashboard'
import ProductInfo from './pages/productdetail/ProductDetail'
import UpdateProductPage from './pages/updateproduct/UpdateProductPage'
import ProtectedRouteforAdmin from './components/protectedroute/ProtectedRouteforAdmin'
import ProtectedRouteforUser from './components/protectedroute/ProtectedRouteforUser'
import AddProductPage from './pages/addproduct/AddProductPage'
const App = () => {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path='/' element= {<HomePage />} />
        <Route path='/login' element= {<Login />}/> 
        <Route path='/signup' element= {<Signup />} />
        <Route path='/pages/productdetail' element= {<ProductInfo />} />

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

        <Route path='/pages/updateproduct' element= {
          <ProtectedRouteforAdmin>   
             <UpdateProductPage />
          </ProtectedRouteforAdmin>   
          }/>

        <Route path='/pages/addproduct' element= {
          <ProtectedRouteforAdmin>
             <AddProductPage />
          </ProtectedRouteforAdmin>
          }/>   

      </Routes>
      <Toaster />
    </Router>
    </MyState>
  )
}

export default App