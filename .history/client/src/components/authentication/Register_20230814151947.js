import './Register.css'

import React from 'react'
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
            <section ClassName="vh-100">
            <div ClassName="container-fluid h-custom">
                <div ClassName="row d-flex justify-content-center align-items-center h-100">
                <div ClassName="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    ClassName="img-fluid" alt="Sample image"/>
                </div>
                <div ClassName="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <h1 ClassName="mb-4 home-subtitle" style={{letterSpacing: "1px"}}>Register</h1>
                    <form>

                    <div ClassName="form-outline mb-4">
                        <input type="email" id="form3Example3" ClassName="form-control form-control-lg"
                        placeholder="Enter a valid email address" />
                        <label ClassName="form-label" for="form3Example3">Email address</label>
                    </div>

                    <div ClassName="form-outline mb-3">
                        <input type="password" id="form3Example4" ClassName="form-control form-control-lg"
                        placeholder="Enter password" />
                        <label ClassName="form-label" for="form3Example4">Password</label>
                    </div>

                    <div ClassName="d-flex justify-content-between align-items-center">
                        <div ClassName="form-check mb-0">
                        <input ClassName="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label ClassName="form-check-label" for="form2Example3">
                            Remember me
                        </label>
                        </div>
                        <a href="#!" ClassName="text-body">Forgot password?</a>
                    </div>

                    <div ClassName="text-center text-lg-start mt-4 pt-2">
                        <button type="button" ClassName="btn btn-default register-option btn-lg"
                        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Sign Up</button>
                        <p ClassName="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                            ClassName="link-danger">Register</a></p>
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
