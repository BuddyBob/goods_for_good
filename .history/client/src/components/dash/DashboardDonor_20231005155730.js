import './dashboard.css'

import React, { useEffect, useState } from 'react'

import AddPopup from './AddPopup'
import Items from './Items'
import Navbar from '../navbar/Navbar';
import plus from '../../Assets/plus.png'

const DashboardDonor = () => {
  const [addPopup, setAddPopup] = useState(false)
  successNoti = () => toast("Item successfully uploaded");

  function closePopup() {
    setAddPopup(false)
    successNoti()

  }
  return (
    <div className="container d-flex align-items-left dashboard-main">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <Navbar />
      <h1 className="home-subtitle" style={{ color: 'black', marginTop: '200px' }}>
        Dashboard
      </h1>
      <div className="container dashboard-container">
        <div className="your-items">
          {addPopup && <AddPopup onClose={() => closePopup()} />}
          <h3 className="section-label">Your Items</h3> 
          <div className="row cards-row">
              <img  className="card-plus" onClick={() => setAddPopup(true)} src={plus} alt="Card image cap"  />
              <Items type="donor"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDonor


