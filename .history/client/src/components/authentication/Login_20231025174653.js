import './Auth.css'

import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Navbar from '../navbar/Navbar'
import auth from '../../Assets/auth.jpg'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const userNotExists = () => toast("Could not find this user");

    function handleLogin(e, email, password, userType) {
        e.preventDefault()
        fetch('http://127.0.0.1:4000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, userType}),
        }).then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.code === 200){
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("refreshToken", data.refresh_token);
                localStorage.setItem("userType", data.userType);
                localStorage.setItem("location", data.location);
                localStorage.setItem("loggedIn", true)
                console.log(email, password, data.userType)
                navigate('/')
            } else if (data.code == 401) {
                userNotExists()
            }
          })
          .catch(error => {
            console.log(error)
          });
      }

    return (
        <div>
            <Navbar/>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={auth}
                            className="img-fluid" alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 auth-form">
                            <h1 className="mb-4 home-subtitle" style={{letterSpacing: "1px"}}>Log in</h1>
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

                            {/* <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label className="form-check-label" htmlFor="form2Example3">
                                    Remember me
                                </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div> */}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-default auth-button" onClick={(e) => handleLogin(e, email, password, location.state)}>Log in</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#"
                                    className="link-danger">Sign Up</a></p>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login
