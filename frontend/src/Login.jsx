import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Valudation from './LoginValidation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Login() {
    const[values,setValues] = useState({
        email:'',
        password:''
    })
    const [errors,setError]= useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const native =useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setError(Valudation(values));
   
        if (errors.email=== "" && errors.password === "" ) { // Hata olmadığını kontrol edin
            await axios.post('http://localhost:8081/login', values)
            .then(res=>{
                if(res.data.message === "Başarılı oturum açma"){
                    native('/home');
                }else{
                    alert("No record existed");
                }
            })
            .catch (err => console.log(err));    
    }
    }
    return (
        <div className='d-flex bg-secondary justify-content-center align-items-center vh-100 '>
            <div className='bg-white p-5 rounded-0 w-42 '>
               <div className='justify-content-center align-items-center'>
                <ul className='list-group'>
                    <li  className="list-group justify-content-center align-items-center display-5 font-weight-bold"><strong >XYZ-Cars</strong> </li>
                    <li  className="list-group justify-content-center align-items-center mb-3">Please log in to continue</li>
                </ul>
                
                </div>
                <form action='' onSubmit={handleSubmit}>
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
                    <button type='submit' className='btn btn-primary w-100 rounded-0 mb-1'> Log in</button>
                    <hr/>
                    <Link to="/signup"  type='submit' className='btn btn-default text-primary bg-light w-100 rounded-0 text-decoration-none'>No account yet? Sign Up</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
