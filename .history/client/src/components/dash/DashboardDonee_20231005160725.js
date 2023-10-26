import './dashboard.css'

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import AddPopup from './AddPopup'
import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardDonee = () => {
  
  const [addPopup, setAddPopup] = useState(false)
  const successNoti = () => toast("Item successfully uploaded");


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
      <div className="dashboard-container">
        
          {/* {addPopup && <AddPopup onClose={() => setAddPopup(false)} />} */}
          <h3 className="section-label">Your Items</h3>
          <div className="row cards-row">
              <Items type="donee"/>
          </div>
      </div>
    </div>
  );
}

export default DashboardDonee


