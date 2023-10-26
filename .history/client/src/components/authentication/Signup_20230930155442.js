import './Auth.css'
import 'react-toastify/dist/ReactToastify.css';

import React, {useEffect, useState} from 'react'

import GoogleAuto from './GoogleAuto';
import Navbar from '../navbar/Navbar'
import auth from '../../Assets/auth.jpg'
import { toast } from 'react-toastify';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [locationInput, setLocationInput] = useState()

    //create a google auto complete location funciton



      
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
                navigate('/')
            }
            else {toast(data)}
          })
          .catch(error => {
            console.log(error)
          });
      }

    return (
        <div>
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
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Location</label>
                            </div>
                            

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-default auth-button" onClick={(e) => handleSignup(e, email, password, location.state)}>Sign Up</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Have an account? <a href="#!"
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
