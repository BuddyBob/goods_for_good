import './Register.css'

import React from 'react'
import register from '../../Assets/register.png'
import {useLocation} from 'react-router-dom';

const Register = () => {
    const location = useLocation();

    function handleRegistration(email, password, userType) {
        fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, userType }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.message); // Should display a success message
          })
          .catch(error => {
            console.error('Registration error:', error);
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
                                placeholder="Enter a valid email address" />
                                <label className="form-label" for="form3Example3">Email address</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter password" />
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
                                <button type="button" className="btn btn-default register-button">Sign Up</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                    className="link-danger">Register</a></p>
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
