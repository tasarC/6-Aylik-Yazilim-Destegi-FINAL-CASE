import React, { useState } from 'react'
import './ChangePassword.css'
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ChangePassword() {

    const [formData, setFormData] = useState({
        oldpassword: '',
        newpassword: '',
        newpasswordrepeat: '',
    });

    function submitCarForm() {
        // Form elemanını seçin
        const form = document.getElementById('editForm');
        // Form elemanının input alanlarını temizleyin
        form.reset();
    }

    const [message, setMessage] = useState(''); // İşlem sonucu için mesaj
    const [error, setError] = useState(''); // Hata mesajı

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Eski ve yeni şifreleri kontrol et
        if (formData.newpassword !== formData.newpasswordrepeat) {
            setError('Yeni şifreler eşleşmiyor.');
            return;
    }
         await axios.post('http://localhost:8081/login/changepassword/', formData)
            .then((res) => {
                setMessage(res.data.message || 'Şifre başarıyla değiştirildi.');
                setError('');
                submitCarForm();
                
            })
            .catch((err) => {
                setError(err.response.data.error || 'Bir hata oluştu.');
                setMessage('');
            });
    };

    return (
        <div className='vh-100'>
            <div className="row">
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9 changepassword">
                    <h1 className='p-4 '><strong>Change Password</strong></h1>
                    <div className='container '>
                        <div className=' changepassword p-5'>
                            {message && <p>{message}</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <form id="editForm" action='' onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <label className='mb-1' htmlFor="oldpassword">Old Password</label>
                                    <input type="oldpassword" placeholder='Placeholder' name='oldpassword'
                                        value={formData.oldpassword}
                                        onChange={handleChange} className='form-control ' id="oldpassword" />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="newpasword">New Password</label>
                                    <input type="newpasword" placeholder='Placeholder' name='newpassword'
                                        value={formData.newpassword}
                                        onChange={handleChange} className='form-control ' id="newpassword" />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-1 ' htmlFor="newpasswordrepeat">New Password Repeat</label>
                                    <input type="newpasswordrepeat" placeholder='Placeholder' name='newpasswordrepeat'
                                        value={formData.newpasswordrepeat}
                                        onChange={handleChange} className='form-control ' id="newpasswordrepeat" />
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

export default ChangePassword
