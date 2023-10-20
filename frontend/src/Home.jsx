import React from 'react'
import Sidebar from './components/Sidebar/sidebar'
import ListCars from './components/ListCars/ListCars'


function Home() {
    return (
        <div className=''>
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <ListCars/>
                </div>
            </div>

        </div>


    )
}

export default Home
