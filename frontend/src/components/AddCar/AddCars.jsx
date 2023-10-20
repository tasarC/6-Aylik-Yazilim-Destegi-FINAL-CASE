import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './AddCars.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

function AddCars() {

    const [values, setValues] = useState({
        user_id: '',
        car_name: '',
        brand: '',
        model: '',
        year: '',
        plaka: ''
    });

    const [plakaErrorMessage, setPlakaErrorMessage] = useState('');
    const [yearErrorMessage, setYearErrorMessage] = useState(''); // Plaka hata mesajı


    function submitCarForm() {
        // Form elemanını seçin
        const form = document.getElementById('carForm');

        // Form elemanının input alanlarını temizleyin
        form.reset();
    }

    const validatePlaka = (plaka) => {
        // Plaka için regex kuralları
        const plakaRegex = /^[A-Z0-9]{8}$/;

        if (!plakaRegex.test(plaka)) {
            setPlakaErrorMessage('Plaka geçerli değil. Plaka 8 karakterden oluşmalıdır,küçük harf,boşluk ve  türkçe karakter içeremez');
            return false;
        } else {
            setPlakaErrorMessage(''); // Hata mesajını temizle
            return true;
        }
    };

    const validateYear = (year) => {
        if (year.trim() === '') {
            setYearErrorMessage('Year boş olamaz');
            return false;
        } else if (!/^\d{4}$/.test(year)) {
            setYearErrorMessage('Year 4 rakamdan oluşmalıdır');
            return false;
        } else {
            setYearErrorMessage(''); // Hata mesajını temizle
            return true;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validatePlaka(values.plaka)) {
            return;
        }
        if (!validateYear(values.year)) {
            return;
        }
        await axios.post('http://localhost:8081/cars', values)
            .then(res => {
                console.log(res);
                submitCarForm(); // Formu temizle
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='vh-100'>
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9 addcars">
                    <h1 className='p-4 '><strong>Add New Cars</strong></h1>
                    <div className='container'>
                        <div className='p-5'>
                            <form id="carForm" onSubmit={handleSubmit} action=''>
                                <div className='mb-4'>
                                    <label className='mb-1' htmlFor="carname">Car Name</label>
                                    <input type="text" placeholder='Placeholder' name='text'
                                        onChange={e => setValues({ ...values, car_name: e.target.value })} className='form-control ' />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="plaka">Plaka</label>
                                    <input type="text" placeholder='Placeholder' name='plaka'
                                        onChange={e => setValues({ ...values, plaka: e.target.value })} className='form-control ' />
                                    <span className="text-danger">{plakaErrorMessage}</span>
                                </div>

                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="inputGroupSelect01">Brand</label>
                                    <select onChange={e => setValues({ ...values, brand: e.target.value })} className="form-select" >
                                        <option>Ford</option>
                                        <option>Ford</option>
                                        <option>Audi</option>
                                        <option>BMW</option>
                                        <option>Hyundai</option>
                                        <option>Volvo </option>
                                        <option>Mercedes </option>
                                        <option>Toyoto </option>
                                    </select>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="inputGroupSelect01">Model</label>
                                    <select onChange={e => setValues({ ...values, model: e.target.value })} className="form-select">
                                        <option>TUCSON</option>
                                        <option>TUCSON</option>
                                        <option>A3 Cabrio</option>
                                        <option>Corolla</option>
                                        <option>Viano</option>
                                        <option>Focus</option>
                                    </select>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="password">Year</label>
                                    <input type="text" placeholder='Placeholder' name='year'
                                        onChange={e => setValues({ ...values, year: e.target.value })} className='form-control ' />
                                    <span className="text-danger">{yearErrorMessage}</span>
                                </div>


                                <div className='d-flex position-absolute end-0 px-sm-5'>
                                    <Link to="/home" className='btn btn-primary  rounded-0 mb-1 mx-sm-2'> Cancel </Link>
                                    <button type='submit' className='btn btn-primary  rounded-0 mb-1'> Save<i className="bi bi-floppy mx-sm-2"></i></button>

                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddCars
