import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Editcars() {
    const { id } = useParams();
    const [plakaErrorMessage, setPlakaErrorMessage] = useState(''); // Plaka hata mesajı
    const [yearErrorMessage, setYearErrorMessage] = useState('');

    const [values, setValues] = useState({
        car_name: '',
        brand: '',
        model: '',
        year: '',
        plaka: ''
    });

    function submitCarForm() {
        // Form elemanını seçin
        const form = document.getElementById('editForm');
        // Form elemanının input alanlarını temizleyin
        form.reset();
    }

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + id)
            .then(res => {
                console.log(res)
                setValues(res.data[0])
            })
            .catch(err => {
                console.log(err); // Hata durumunda veriyi boş bir dizi olarak ayarlayın
            });
    }, []);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePlaka(values.plaka)) {
            // Plaka hatalı, işlemi durdurabilirsiniz.
            return;
        }
        if (!validateYear(values.year)) {
            // Plaka hatalı, işlemi durdurabilirsiniz.
            return;
        }
        axios.put('http://localhost:8081/editcars/' + id, values)
            .then(res => {
                console.log(res);
                submitCarForm();
                // Başarılı güncelleme durumunda kullanıcıyı yönlendirme veya başka bir işlem yapma
            }).catch(err => console.log(err));
    }


    return (
        <div className='vh-100'>
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <h1 className='p-4 '><strong>Edit Car</strong></h1>
                    <div className='container'>
                        <div className='p-5'>
                            <form id="editForm" onSubmit={handleSubmit} action=''>
                                <div className='mb-4'>
                                    <label className='mb-1' htmlFor="carname">Car Name</label>
                                    <input type="text" placeholder='Placeholder' value={values.car_name}
                                        onChange={e => setValues({ ...values, car_name: e.target.value })} className='form-control ' />
                                </div>

                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="inputGroupSelect01">Brand</label>
                                    <select value={values.brand} onChange={e => setValues({ ...values, brand: e.target.value })} className="form-select" >
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
                                    <select value={values.model} onChange={e => setValues({ ...values, model: e.target.value })} className="form-select">
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
                                    <input type="text" placeholder='Placeholder' value={values.year}
                                        onChange={e => setValues({ ...values, year: e.target.value })} className='form-control ' />
                                    <span className="text-danger">{yearErrorMessage}</span>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="plaka">Plaka</label>
                                    <input type="text" placeholder='Placeholder' value={values.plaka}
                                        onChange={e => setValues({ ...values, plaka: e.target.value })} className='form-control ' />
                                    <span className="text-danger">{plakaErrorMessage}</span>
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

export default Editcars
