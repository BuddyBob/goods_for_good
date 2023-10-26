import './marketplace.css'

import React, { useEffect, useState } from 'react'

import {GiPathDistance} from 'react-icons/gi'
import MarketPopup from './MarketPopup'
import Navbar from '../navbar/Navbar';

const Marketplace = () => {
  const [addPopup, setAddPopup] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/api/main/get-all-items', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No items found');
        }
      })
      .then((data) => {
        console.log(data)
        setItems(data.items.flatMap(item => item));
        setItemIds(data.item_ids);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch image data for each item
    itemIds.forEach((itemId) => {
      fetchImage(itemId);
    });
  }, [itemIds]);

  const fetchImage = (itemId) => {
    fetch(`http://127.0.0.1:4000/api/main/get-image/${itemId}`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Image not found');
        }
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showPopup = (itemId, item) => {
    if (localStorage.getItem('userType') == 'volunteer'){
      if (item.status == 'needs_delivery'){
        setAddPopup(true);

        setSelectedItemId(itemId);
        setSelectedItem({
          title: item.title,
          description: item.description,
          location: item.location,
          donee_location: item.donee_location,
          owner: item.owner,
          status: item.status
        });
      }
    }
    else if (localStorage.getItem('userType') == 'donee'){
      if (item.status == 'available'){
        setAddPopup(true);

        setSelectedItemId(itemId);
        setSelectedItem({
          title: item.title,
          description: item.description,
          location: item.location,
          donee_location: item.donee_location,
          owner: item.owner,
          status: item.status,
        });
      }
        else{
          alert('Item is not available')
      }
    } else{
      alert('You must be a donee to checkout items')
    }
  }



  return (
    <div className="container d-flex align-items-center marketplace-main">
      <Navbar />
      <h1 className="home-subtitle" style={{ color: 'black', marginTop: '200px' }}>
        Marketplace
      </h1>

      <div className="container marketplace-container">
      {addPopup && (
          <MarketPopup onClose={() => setAddPopup(false)} itemId={selectedItemId} item={selectedItem} />
        )}
        <div className="cards-row">
          {items.map((item, index) => (
            <div className="col-md" key={itemIds[index]}> {/* Moved key to the outer div */}
            <div className="status">
              <p className="status-text">{item.status}</p>
            </div>
              <div className="card-item mb-4" onClick={() => showPopup(itemIds[index],item)}>
                <img src={`http://127.0.0.1:4000/api/main/get-image/${itemIds[index]}`} className="card-img-top img-fluid item-image" alt="Item" />
                <div className="card-body">
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-text">{item.description}</p>
                  { localStorage.getItem("userType") == "donee" || localStorage.getItem("userType") == "donor" ? (
                    <p className="card-text">{item.location}</p>
                  ) : (
                    <p className="card-text">
                      <strong>Pickup and Drop-off</strong> {item.location} <GiPathDistance/>  {item.donee_location}
                    </p>
                  )}
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace


