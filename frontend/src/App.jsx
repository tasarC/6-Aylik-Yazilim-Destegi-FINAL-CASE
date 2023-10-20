import React from 'react'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import ListCars from './components/ListCars/ListCars'
import AddCars from './components/AddCar/AddCars'
import EditCars from './components/EditCar/EditCars'
import ChangePassword from './components/ChangePassword/ChangePasword'
import Read from './Read'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}> </Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/listcars' element={<ListCars/>}></Route>
          <Route path='/read/:id' element={<Read/>}></Route>
          <Route path='/addcars/' element={ <AddCars/>}></Route>
          <Route path='/editcars/:id' element={ <EditCars/>}></Route>
          <Route path='/changepassword' element={ <ChangePassword/>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
