import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Valudation from './LoginValidation'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        password_repeat: '',
    })

    const [errors, setError] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));

        if (name === 'password_repeat') {
            if (value !== values.password) {
                setError((prev) => ({ ...prev, password_repeat: 'Password and Password_repeat are not equal' }));
            } else {
                setError((prev) => ({ ...prev, password_repeat: '' }));
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const togglePasswordRepeatVisibility = () => {
        setShowPasswordRepeat((prevShowPasswordRepeat) => !prevShowPasswordRepeat);
    };


    const native = useNavigate();

    const handleSubmit = async  (event) => {
        event.preventDefault();
        setError(Valudation(values));

        if (Object.values(errors).every((error) => !error)) { // Hata olmadığını kontrol edin
            try {
                const response = await axios.post('http://localhost:8081/signup', values);
                console.log(response.data);
                alert('Başarılı kayıt işlemi');
                native('/');
            } catch (err) {
                if (err.response && err.response.status === 400 && err.response.data.error === 'Bu e-posta adresi zaten kayıtlı') {
                    alert('Bu e-posta adresi zaten kayıtlı');
                } else {
                    console.error(err);
                    // Diğer hatalar
                }
            }
        }
    }


    return (
        <div className='d-flex bg-secondary justify-content-center align-items-center vh-100'>
            <div className='bg-white p-5 rounded w-28'>
                <div className='justify-content-center align-items-center'>
                    <ul className='list-group'>
                        <li className="list-group justify-content-center align-items-center display-5 font-weight-bold"><strong >XYZ-Cars</strong> </li>
                        <li className="list-group justify-content-center align-items-center mb-3">Sign Up</li>
                    </ul>

                </div>
                <form action='' onSubmit={handleSubmit} className='container'>
                    <div className='mb-4'>
                        <label className='mb-1' htmlFor="username">Usename</label>
                        <input type="email" id='email' placeholder='Placeholder' name='email'
                            onChange={handleInput} className='form-control rounded-0' />

                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='row mb-4'>
                        <label className='mb-1 ' htmlFor="password">Password</label>
                        <div className='col-11'>
                            <input type={showPassword ? 'text' : 'password'} id='password' placeholder='Placeholder' name='password'
                                onChange={handleInput} className='form-control rounded-0 ' />
                        </div>
                        <div className='col-1'>
                            <button
                                type='button'
                                className='btn btn-outline-secondary'
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='row mb-4'>
                        <label className='mb-1 ' htmlFor="password">Password Repeat</label>
                        <div className='col-11'>
                            <input type={showPasswordRepeat ? 'text' : 'password'}  id='password_repeat' placeholder='Placeholder' name='password_repeat'
                                onChange={handleInput} className='form-control rounded-0 ' />
                        </div>
                        <div className='col-1'>
                            <button
                                type='button'
                                className='btn btn-outline-secondary'
                                onClick={togglePasswordRepeatVisibility}
                            >
                                <FontAwesomeIcon icon={showPasswordRepeat ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {errors.password_repeat && <span className='text-danger'>{errors.password_repeat}</span>}
                    </div>
                    <button type='submit' className='btn btn-primary w-100 rounded-0 mb-1'>Sign Up</button><hr/>
                    
                    <Link to="/" type='submit' className='btn btn-default text-primary bg-light w-100 rounded-0 text-decoration-none'>Have an account? Sign In</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup
