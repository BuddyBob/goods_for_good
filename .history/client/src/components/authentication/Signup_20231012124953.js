import './Auth.css'

import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import GoogleLocation from './GoogleLocation'
import Navbar from '../navbar/Navbar'
import auth from '../../Assets/auth.jpg'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const directionsService = new google.maps.DirectionsService();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [locationInput, setLocationInput] = useState()


    const someError = () => toast("Some error occured");
    const userExists = () => toast("User already exists");
      
    function handleSignup(e, email, password, userType) {
        e.preventDefault()
        console.log(email, password, userType)
        fetch('http://127.0.0.1:4000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, locationInput, userType}),
        }).then(response => response.json())
          .then(data => {
            if (data.code === 201){
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("refreshToken", data.refresh_token);
                localStorage.setItem("location", locationInput);
                localStorage.setItem("userType", userType);
                localStorage.setItem("loggedIn", true)
                navigate('#/')
            }
            else if (data.code === 409){
                userExists()
            }
            else{
                someError()
            }
          })
          .catch(error => {
            someError()
          });
      }

      const handleLocationChange = (location) => {
        setLocationInput(location);
      };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
            <Navbar/>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={auth}
                            className="img-fluid" alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 auth-form">
                            <h1 className="mb-4 home-subtitle" style={{letterSpacing: "1px"}}>Sign Up</h1>
                            <form>

                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label className="form-label" htmlFor="form3Example3">Email</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            <GoogleLocation handleLocationChange={handleLocationChange}/>
                    
                            

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-default auth-button" onClick={(e) => handleSignup(e, email, password, location.state)}>Sign Up</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Have an account? <a href="#/login"
                                    className="link-danger">Log in now</a></p>
                            </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Signup
