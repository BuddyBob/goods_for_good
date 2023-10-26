import './Navbar.css'

import logo from '../../Assets/GFG-logo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    function handleLogout(e) {
        e.preventDefault();
        
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
    
        // Helper function to update the access token and perform logout
        const updateAccessTokenAndLogout = (newAccessToken) => {
            localStorage.setItem("accessToken", newAccessToken);
            fetch('http://127.0.0.1:4000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + newAccessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    localStorage.setItem("loggedIn", false);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("userType");
                    navigate('#');
                } else {
                    console.log(data);
                }
            })
            .catch(err => {
                console.log(err);
            });
        };
    
        // Logout using the existing access token
        fetch('http://127.0.0.1:4000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                localStorage.setItem("loggedIn", false);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userType");
                navigate('/marketplace');
            } else {
                // If logout fails, attempt token refresh
                fetch('http://127.0.0.1:4000/api/auth/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + refreshToken
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        // Token refresh successful, update access token and retry logout
                        updateAccessTokenAndLogout(data.access_token);
                    } else {
                        console.log(data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
        <div className="container">
          <a className="navbar-brand" href="#"><img src={logo} height="60" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                    <a className="nav-link mx-2" onClick={() => navigate("#/")}>Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link mx-2" onClick={() => navigate("/dashboard")}>Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link mx-2" onClick={() => navigate("/marketplace")}>Marketplace</a>
                </li>
                {localStorage.getItem("loggedIn") == 'true' &&
                <li className="nav-item">
                    <button className="mx-2 btn btn-default logout" onClick={(e) => handleLogout(e)}>Logout</button>
                </li>
                }
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar