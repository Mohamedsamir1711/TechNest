import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../dashboard/Dashboard'
import CreateProfile from '../profile-forms/CreateProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducations'
import EditProfile from '../profile-forms/EditProfile'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Products from '../products/Products'
import Product from '../product/Product'
import NotFound from '../layout/NotFound'

const Routess = () => {
  return (
    <section className="container">
       <Routes>
         <Route path='/register' element={<Register/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/profiles' element={<Profiles/>} />
         <Route path='/profile/:id' element={<Profile/>} />
         <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
         <Route path='/create-profile' element={<PrivateRoute><CreateProfile/></PrivateRoute>} />
         <Route path='/edit-profile' element={<PrivateRoute><EditProfile/></PrivateRoute>} />
         <Route path='/add-experience' element={<PrivateRoute><AddExperience/></PrivateRoute>} />
         <Route path='/add-education' element={<PrivateRoute><AddEducation/></PrivateRoute>} />
         <Route path='/products' element={<PrivateRoute><Products/></PrivateRoute>} />
         <Route path='/products/:id' element={<PrivateRoute><Product/></PrivateRoute>} />
         <Route path='*' element={<NotFound/>} />
        </Routes>
     </section>
  )
}

export default Routess
