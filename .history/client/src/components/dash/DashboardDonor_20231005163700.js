import './dashboard.css'

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import AddPopup from './AddPopup'
import Items from './Items'
import Navbar from '../navbar/Navbar';
import plus from '../../Assets/plus.png'

const DashboardDonor = () => {
  const [addPopup, setAddPopup] = useState(false)
  const successNoti = () => toast("Item successfully uploaded");

  function closePopup() {
    setAddPopup(false)
    successNoti()
  }
  return (
    <div className="dashboard-main">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="home-subtitle" style={{ color: 'black', marginTop: "200px"}}>
          Dashboard
        </h1>
        {addPopup && <AddPopup onClose={() => setAddPopup(false)} />}
          <Items type="donor"/>
      </div>
    </div>
  );
}

export default DashboardDonor


