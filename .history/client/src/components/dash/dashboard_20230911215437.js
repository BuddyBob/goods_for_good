import './Dashboard.css'

import React, { useState } from 'react'

import AddPopup from './AddPopup'
import Navbar from '../navbar/Navbar';
import plus from '../../Assets/plus.png'

const Dashboard = () => {
  const [addPopup, setAddPopup] = useState(false)



  return (
    <div className="container d-flex align-items-left dashboard-main">
      <Navbar />
        <h1 className="home-subtitle" style={{color: 'black', marginTop: "200px"}}>Dashboard</h1>
        <div className="container dashboard-container">
          <div className="your-items">
            { addPopup &&
              <AddPopup onClose={() => setAddPopup(false)} />
            }
            <h3 className="section-label">
              Your Items
            </h3>
            <div className="col-2 card-item" onClick={() => setAddPopup(true)}>
                <img className="card-img" src="https://source.unsplash.com/LG88A2XgIXY" alt="Card image cap"/>
            </div>
            <div className="row cards-item-row">
              <div className="col-2 card-item">
                <img className="card-img" src="https://source.unsplash.com/LG88A2XgIXY" alt="Card image cap"/>
                {/* <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div> */}
              </div>
              <div className="col-2 card-item">
                <img className="card-img" src="https://source.unsplash.com/LG88A2XgIXY" alt="Card image cap"/>
                {/* <div className="card-body">
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard


