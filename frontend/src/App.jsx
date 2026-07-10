import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Contact from "./pages/Contact"
import DestinationDetails from "./pages/DestinationDetails"
import ExploreDestinations from "./pages/ExploreDestinations"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import MyTrips from "./pages/MyTrips"
import Page404 from "./pages/Page404"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import ProtectedRoute from '../ProtectedRoute'

const App = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />    <NavBar/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<ProtectedRoute/>} >
      <Route path='/trips' element={<MyTrips />} />
      <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/destination/:id' element={<DestinationDetails />} />
      <Route path='/explore' element={<ExploreDestinations />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App