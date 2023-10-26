import './dashboard.css'

import React, { useEffect, useState } from 'react'

import Items from './Items'
import Navbar from '../navbar/Navbar';
import StarRating from './StarRating';

const DashboardVolunteer = () => {
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
          setUser(data);
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

  function findAverage(arr) {
    if (arr.length === 0) {
        return 0;
    }
    
    var sum = arr.reduce(function (acc, val) {
        return acc + val;
    }, 0);
    
    return sum / arr.length;
  }

  return (
    <>
    {addPopup && <AddPopup onClose={() => closePopup()} />}
    <div className={`container-fluid dashboard-main ${addPopup ? 'blur-background' : ''}`}>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="home-subtitle text-center" style={{ color: 'black', marginTop: "200px"}}>
          Volunteer Dashboard
        </h1>
        <div className="container dashboard-sub d-flex justify-content-center align-items-center flex-column mb-5">
          <h3 className="dashboard-section-text mt-5">Your Items</h3>
          <Items type="volunteer"/>
          <h3 className="dashboard-section-text">Your Stats</h3>
          <div className="row mb-5">
            <div className="container rating-widget col-6">
              <div className="rating-widget-value ">
                <h3 className="rating-widget-value-text ">{user && user.service_hours ? user['service_hours'] : 'N/A'}</h3>
              </div>
              <div className="rating-widget-title">
                <div className="rating-widget-title">
                  <h3 className="rating-widget-title-text text-center">Service Hours</h3>
                </div>
              </div>
            </div>
            <div className="container rating-widget col-6">
              <div className="rating-widget-value">
              <h3 className="rating-widget-value-text">
                {user && user.rating && user.rating.length > 0
                  ? <StarRating averageRating={findAverage(user.rating)} />
                  : 'N/A'}
              </h3>
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
    </>
  );
}

export default DashboardVolunteer


