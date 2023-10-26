import './dashboard.css'

import React, { useEffect, useState } from 'react'

import AddPopup from './AddPopup'
import { AiOutlineGift }  from 'react-icons/ai'
import Items from './Items'
import Navbar from '../navbar/Navbar';

const DashboardDonor = () => {
  const [addPopup, setAddPopup] = useState(false)
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4000/api/main/get-user', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            request: localStorage.getItem("userType")
          })
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.rating);
        } else {
          // Handle the case when the response is not OK
          throw new Error('No items found');
        }
      } catch (error) {
        console.error(error);
        // Handle other errors here
      }
    };

    fetchItems();

  }, []);


  function closePopup() {
    setAddPopup(false)
  }

  function findAverage(arr) {
    console.log(arr)
    if (arr.length === 0) {
        return 0; // Handle the case where the array is empty to avoid division by zero.
    }
    
    var sum = arr.reduce(function (acc, val) {
        return acc + val;
    }, 0);
    
    return sum / arr.length;
  }

  return (
  <div className="container-fluid dashboard-main">
    <Navbar />
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h1 className="home-subtitle text-center" style={{ color: 'black', marginTop: "200px"}}>
      <AiOutlineGift/> Donor Dashboard
      </h1>
      {addPopup && <AddPopup onClose={() => closePopup()} />}
      <button className="btn btn-primary btn-circle btn-xl mb-2" onClick={() => setAddPopup(true)}>Add New Item</button>
      <div className="container dashboard-sub d-flex justify-content-center align-items-center flex-column mb-5">
        <h3 className="dashboard-section-text mt-5">Your Items</h3>
        <Items type="donor"/>
        <h3 className="dashboard-section-text">Your Stats</h3>
        <div className="row mb-5">
          <div className="container rating-widget col-6">
            <div className="rating-widget-value">
              <h3 className="rating-widget-value-text">4.5</h3>
            </div>
            <div className="rating-widget-title">
              <div className="rating-widget-title">
                <h3 className="rating-widget-title-text text-center">Items Given</h3>
              </div>
            </div>
          </div>
          <div className="container rating-widget col-6">
            <div className="rating-widget-value ">
              <h3 className="rating-widget-value-text ">{user}</h3>
            </div>
            <div className="rating-widget-title">
              <div className="rating-widget-title">
                <h3 className="rating-widget-title-text text-center">Average Rating</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DashboardDonor


