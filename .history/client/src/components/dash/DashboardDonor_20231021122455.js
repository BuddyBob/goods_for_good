import './dashboard.css'

import React, { useState } from 'react'

import AddPopup from './AddPopup'
import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardDonor = () => {
  const [addPopup, setAddPopup] = useState(false)

  useEffect(() => {
    //reload pagve
    window.location.reload();
  });

  function closePopup() {
    setAddPopup(false)
  }
  return (
    <div className="container-fluid dashboard-main">
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="home-subtitle" style={{ color: 'black', marginTop: "200px"}}>
          Donor Dashboard
        </h1>
        {addPopup && <AddPopup onClose={() => closePopup()} />}
        <button className="btn btn-primary btn-circle btn-xl mb-2" onClick={() => setAddPopup(true)}>Add New Item</button>
        <Items type="donor"/>
      </div>
    </div>
  );
}

export default DashboardDonor


