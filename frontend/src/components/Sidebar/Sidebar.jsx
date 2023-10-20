import React from 'react'
import { Link } from 'react-router-dom'


function Sidebar() {
    return (
        <div className='bg-white p-4'>
            <div className="row ">
                <div className="col-1 ">
                    <i style={{ fontSize: "35px",marginLeft:"40px"}} className="bi bi-xbox"></i>
                </div>
                <div className="col-11  ">
                    <p style={{ marginLeft:"60px" }} className="display-6 font-weight-bold">XYZ-Cars</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <i style={{ fontSize: "25px", }}  className="bi bi-house-door "></i>
                </div>
                <div className="col-11">
                    <Link to="/home" type='submit' className='btn btn-default text-primary bg-light  rounded-0 text-decoration-none'>Home</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-1 ">
                    <i style={{ fontSize: "25px", }}  className="bi bi-folder"></i>
                </div>
                <div className="col-11">
                    <Link to="/changepassword" type='submit' className='btn btn-default text-primary bg-light  rounded-0 text-decoration-none'>Change Password</Link>
                </div>
            </div>
        </div>


    )
}

export default Sidebar
