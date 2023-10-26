import './Dashboard.css'

import React, { useEffect, useState } from 'react'

import AddPopup from './AddPopup'
import Navbar from '../navbar/Navbar';
import plus from '../../Assets/plus.png'

const Dashboard = () => {
  const [addPopup, setAddPopup] = useState(false)
  const [items, setItems] = useState([{title: "test", description: "test", location: "test", image: "test"}])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4000/api/main/get-items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error) {
        console.error(error);
      } finally {
      setLoading(false); // Set loading to false when the fetch is complete
      }
    }

    fetchItems();
  }, []);

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
            <div className="row cards-item-row">
              <div className="col-2 card-item" onClick={() => setAddPopup(true)}>
                <img className="card-img" src="https://source.unsplash.com/LG88A2XgIXY" alt="Card image cap"/>
              </div>
              {loading ? (
                <p>Loading...</p> // Show a loading indicator
              ) : (
                items.map((item, index) => (
                  <div className='col-2 card-item' key={index}>
                    <p>item.title</p>
                    <img className="card-img" src={item.image} alt="Card image cap"/>
                  </div>
                ))
              )}
              

              
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard


