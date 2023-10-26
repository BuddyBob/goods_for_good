import './Register.css'
import 'react-toastify/dist/ReactToastify.css';

import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';

import register from '../../Assets/register.jpg'
import {useLocation} from 'react-router-dom';

const Register = () => {
    const location = useLocation();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    function handleRegistration(e, email, password, userType) {
        e.preventDefault()
        localStorage.setItem("userType", userType)
        console.log(email, password, userType)
        fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, userType}),
        })
          .then(response => response.json())
          .then(data => {
            if (data.code === 201){toast("Registration Successful!")}
            else {toast(data)}
          })
          .catch(error => {
            console.error('Registration error:', error);
            toast(error);
            // Handle error messages or actions here
          });
      }

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={register}
                            className="img-fluid" alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 auth-form">
                            <h1 className="mb-4 home-subtitle" style={{letterSpacing: "1px"}}>Register</h1>
                            <form>

                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label className="form-label" for="form3Example3">Email address</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="form-label" for="form3Example4">Password</label>
                            </div>

                            {/* <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label className="form-check-label" for="form2Example3">
                                    Remember me
                                </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div> */}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-default register-button" onClick={(e) => handleRegistration(e, email, password, location.state)}>Sign Up</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                                    className="link-danger">Sign In</a></p>
                            </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Register
