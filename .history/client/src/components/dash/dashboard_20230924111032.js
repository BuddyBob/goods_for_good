import './Dashboard.css'

import React, { useEffect, useState } from 'react'

import AddPopup from './AddPopup'
import Items from './Items'
import Navbar from '../navbar/Navbar';
import plus from '../../Assets/plus.png'

const Dashboard = () => {
  const [addPopup, setAddPopup] = useState(false)
  const [items, setItems] = useState([{title: "test", description: "test", location: "test", image: "test"}])
  const [loading, setLoading] = useState(true);
  return (
    <div className="container d-flex align-items-left dashboard-main">
      <Navbar />
      <h1 className="home-subtitle" style={{ color: 'black', marginTop: '200px' }}>
        Dashboard
      </h1>
      <div className="container dashboard-container">
        <div className="your-items">
          {addPopup && <AddPopup onClose={() => setAddPopup(false)} />}
          <h3 className="section-label">Your Items</h3>
          
          <div className="row items-container">
              <img  className=" card-plus" onClick={() => setAddPopup(true)} src={plus} alt="Card image cap"  />
              <Items />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard


