import './index.css'

import GFG  from './Assets/GFG-logo.png'
import Navbar from './components/navbar/Navbar'
import React from "react"
import { useNavigate } from "react-router-dom"

const Home = () =>  {
    const navigate = useNavigate();
    function handleSignup(e, userType) {
        e.preventDefault();
        navigate("/signup", {state: userType});
    }

    function handleLogin(e) {
        e.preventDefault();
        navigate("/login");
    }

    return (
        <div className="Home">
            <Navbar/>
            <div className="container-fluid home-container" style={{background: "#FFAC4D", height: "90vh"}}>
                <div className="container center-content">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="home-title">GOODS FOR GOOD</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p className="home-description">
                                Welcome to Homeless Connect, the platform bridging the gap between those in need and the people willing to help. By uniting communities through acts of kindness, we're making a real difference for individuals at the risk of experiencing homelessness
                            </p>
                        </div>
                    </div>
                    {(!localStorage.getItem('loggedIn') || localStorage.getItem('loggedIn') == 'false') &&
                    <>
                        <div className="row button-group">
                            <button className="col-3 btn btn-default auth-option"
                            onClick={(e) => handleSignup(e,"donee")}
                            >
                                Receiver
                            </button>
                            <button className="col-3 btn btn-default auth-option"
                            onClick={(e) => handleSignup(e,"donor")}
                            >
                                Donor
                            </button>
                            <button className="col-3 btn btn-default auth-option"
                            onClick={(e) => handleSignup(e,"volunteer")}
                            >
                                Volunteer
                            </button>
                        </div>
                        <div className="row button-group">
                            <button className="col-3 btn btn-default auth-option"
                            style={{background:'black', color: 'white'}}
                            onClick={(e) => handleLogin(e)}
                            >
                                Log in
                            </button>
                        </div>
                    </>
                    }
                </div>
            </div>
            <div className="container-fluid home-container" style={{background: "#FFFFFF"}}>
                <div className="container home-subtitle-container">
                    <h2 className="home-subtitle">How It Works</h2>
                </div>
                
                <div className="container center-content">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="how-it-works-card">
                                <h2 className="card-title"><strong>High Schoolers</strong></h2>
                                <p className="card-description">
                                Empowering young volunteers to participate in their community and help distribute items.
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="how-it-works-card">
                                <h2 className="card-title"><strong>Donors</strong></h2>
                                <p className="card-description">
                                Instead of throwing items into landfill, the donor can donate and recycle the items.
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="how-it-works-card">
                                <h2 className="card-title"><strong>Receivers</strong></h2>
                                <p className="card-description">
                                The platform helps people who are at risk of homelessness by providing them with a marketplace where they can get items that they are in need of without having to expend their resources.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid home-container" style={{background: "#FFAC4D"}}>
                <div className="container center-content">
                    <h2 className="home-subtitle" style={{color: 'black'}}>Meet the Team</h2>
                    <div style={{width: "50%"}}>
                        <p className="home-description" style={{ color: 'black' }}> A motivated team united to create real change for the people at risk of homelessness.</p>
                    </div>
                </div>
                <div className="container center-content">
                    <div className="row">
                        <div className="col-sm">
                            <div className="profile-card">
                                <div className="profile-card-image">
                                    <img src="https://source.unsplash.com/0KAEhUHvcmQ" className="round" alt="" ></img>
                                </div>
                                <h2 className="profile-card-title">Thavas Antonio</h2>
                                <div className="profile-card-description">
                                    <p>
                                        CEO & Co-founder
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="profile-card">
                                <div className="profile-card-image">
                                    <img src="https://source.unsplash.com/f3vwAXn7pgg" className="round" alt="" ></img>
                                </div>
                                <h2 className="profile-card-title">Thavas Antonio</h2>
                                <div className="profile-card-description">
                                    <p>
                                        CEO & Co-founder
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="profile-card">
                                <div className="profile-card-image">
                                    <img src="https://source.unsplash.com/Qt0ogPnhGWY" className="round" alt="" ></img>
                                </div>
                                <h2 className="profile-card-title">Thaze Antonio</h2>
                                <div className="profile-card-description">
                                    <p>
                                        CEO & Co-founder
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid home-container" style={{background: "#FFAC4D"}}>
                <div className="container home-subtitle-container">
                    <h2 className="home-subtitle" style={{color: 'black'}}>FAQ</h2>
                </div>
                <div className="container center-content">
                    <div className="row">
                        <div className="col-sm">
                            <div className="faq-card">
                                <h2 className="card-title" style={{color: "black"}}> How does the item donation process work? </h2>
                                <p className="card-description" style={{width: "95%"}}> Donors can upload their items to our marketplace, providing pictures, item descriptions, and locations. People in need can then browse and request the items they need. </p>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="faq-card">
                                <h2 className="card-title"  style={{color: "black"}}> How can I help as a high-schooler? </h2>
                                <p className="card-description" style={{width: "95%"}}> By signing up as a volunteer, high schoolers will be able to browse the marketplace and offer their support in picking up and dropping off donated items.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container-fluid home-container" style={{background: "#FF8F33"}}>
                <div className="container center-content">
                    <img src={GFG} alt="GFG" className="footer-logo" />
                    <div className="copyright-container">
                        <p className="copyright">© Goods For Good 2023</p>
                        <p className="copyright" style={{opacity: ".5"}}>Generated on August 13, 2023</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;