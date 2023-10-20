import React from 'react'
import './mainbar.css'
import ListCars from '../ListCars/ListCars'
import { Link } from 'react-router-dom'

function Mainbar() {
  return (
    <div className='mainbar' >
      <h1 className='p-4'><strong>My Cars</strong></h1>
      <form className="d-flex justify-content-center align-items-center">
        <input className="form-control border-top border-start border-end" type="search" placeholder="Count0" aria-label="Search"/>
        <button className="btn-group bg-white border-0 mx-sm-3 p-2" type="submit"><i className="bi bi-search mx-sm-2"></i>Search</button>
      </form>
      <button className='btn border-primary border-6 m-4'><i className="bi bi-plus-lg mx-sm-3 "></i> <Link to="/addcars" className='text-decoration-none'>Add New Car</Link></button>
      <div>
        <ListCars/>
      </div>
    </div>
  )
}

export default Mainbar
