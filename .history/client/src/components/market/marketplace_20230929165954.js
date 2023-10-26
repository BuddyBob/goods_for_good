import './marketplace.css'

import React, { useEffect, useState } from 'react'

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

  const showPopup = (itemId, title, description, location, status) => {
    setAddPopup(true);

    setSelectedItemId(itemId);
    setSelectedItem({
      title: title,
      description: description,
      location: location,
      status: status,
    });
  }



  return (
    <div className="container d-flex align-items-center marketplace-main">
      <Navbar />
      <h1 className="home-subtitle" style={{ color: 'black', marginTop: '200px' }}>
        Marketplace
      </h1>

      <div className="container marketplace-container">
        <div className="row cards-item-row">
        {items.map((item, index) => (
          <div className="col" key={itemIds[index]}> {/* Moved key to the outer div */}
            <div className="status">
              {console.log(item.status)}
              <p>{item.status}</p>
            </div>

            <div className="card-item" onClick={() => showPopup(itemIds[index], item.title, item.description, item.location, item.status)}>
              <div style={{ "height": "18rem" }}>
                <img src={`http://127.0.0.1:4000/api/main/get-image/${itemIds[index]}`} className="card-img-top img-fluid" style={{ "height": "100%", "width": "auto" }} alt="Item" />
              </div>
              <div className="card-body">
                <h4 className="card-title">{item.title}</h4>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
            {addPopup && p && selectedItemId === itemIds[index] &&(
              <MarketPopup onClose={() => setAddPopup(false)} itemId={selectedItemId} item={selectedItem} />
            )}
          </div>
        ))}
      </div>

      {/* Conditionally render MarketPopup outside of the map function */}
      {/* {addPopup && <MarketPopup onClose={() => setAddPopup(false)} itemId={selectedItemId} item={selectedItem} />} */}

      </div>
    </div>
  );
}

export default Marketplace


