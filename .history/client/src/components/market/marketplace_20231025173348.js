import './marketplace.css'

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import {GiPathDistance} from 'react-icons/gi'
import Map from '../dash/Map'
import MarketPopup from './MarketPopup'
import Navbar from '../navbar/Navbar';
import { SlLocationPin } from 'react-icons/sl';
import { withScriptjs } from "react-google-maps";

const Marketplace = () => {
  const [addPopup, setAddPopup] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(false);
  const MapLoader = withScriptjs(Map);
  
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);

  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipVisibility, setTooltipVisibility] = useState(new Array(items.length).fill(false));


  const noItems = () => toast("Could not retrieve posts")
  const noDelivery = () => toast("Item does not need delivery")
  const notAvailable = () => toast("Item is not available")
  const notDonee = () => toast("You must be a receiver to checkout items")

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
          noItems()
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
    //make sure if directions was pressed then don't show the popup
    if (map){
      return
    }
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
          checked_out_by: item.checked_out_by,
          status: item.status
        });
      } else {
        noDelivery()
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
          notAvailable();
      }
    } else{
      notDonee()
    }
  }


  const handleGoogleMapsLink = (e, locationInput) => {
    e.preventDefault();
    const googleMapsLink = `https://www.google.com/maps?q=${locationInput}`;
    window.open(googleMapsLink, "_blank");
  };

  function displayDirections(e, item){
    e.preventDefault();
    setMap(true);
    setDirections({"origin":item.location, "destination": item.donee_location});
  }

  const getStatusColor = (status) =>  {
    const colorMap = {
      available: '#A3C3F0',
      needs_delivery: '#FFB56B',
      pre_delivery: '#F5DB93',
      en_route: '#C1AEFF',
      Delivered: '#A9EBC4'
    };
    return colorMap[status]
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column" style={{"position": "absolute", "bottom": "50%", "top": "50%", "right": "0%", "left": "0%"}}>
      {addPopup && (<MarketPopup onClose={() => setAddPopup(false)} itemId={selectedItemId} item={selectedItem} />)}
      </div>
      <div className={`container d-flex align-items-center marketplace-main  ${addPopup ? 'blur-background' : ''}`}>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        <Navbar />
        <h1 className="home-subtitle" style={{ color: 'black', marginTop: '200px' }}>Marketplace</h1>

        <div className="container d-flex justify-content-center align-items-center flex-column">

          {map && <MapLoader
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4"
          loadingElement={<div style={{ height: "100%" }} />}
          directions={directions}
          onClose={() => setMap(false)} 
          className="google-map"
          />
          }

          <div className="d-flex align-content-start flex-wrap item-container">
            {items.map((item, index) => (

              <div className="p-3" key={itemIds[index]}> 
                <div className="row">
                  <div className="status1 col-4">
                    <p className="status-text">Status</p>
                  </div>
                  <div className="status2 col-7"  style={{ backgroundColor: getStatusColor(item.status) }}>
                    <p className="status-text">{item.status}</p>
                  </div>
                </div>

                <div className="card-item mb-4" onClick={() => showPopup(itemIds[index],item)}>
                  <img src={`http://127.0.0.1:4000/api/main/get-image/${itemIds[index]}`} className="card-img-top item-image" alt="Item" />
                  <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-text">{item.description}</p>
                    {
                      localStorage.getItem('userType') === 'volunteer' && (
                        item.status === "available" ? (
                          <p className="card-text" onClick={(e) => handleGoogleMapsLink(e, item.donee_location)}><SlLocationPin /> {item.location}</p>
                        ) : (
                          <p
                            className={`card-text ${hovered ? 'hover-effect' : ''}`}
                            onClick={(e) => displayDirections(e, item)}
                            onMouseEnter={() => {setHovered(true);setShowTooltip(true);}}
                            onMouseLeave={() => {setHovered(false);setShowTooltip(false);}}
                          >
                            <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-top-${index}`}> {item.location} to {item.donee_location}</Tooltip>} show={tooltipVisibility[index]}>
                              <span>
                                <strong>Directions</strong> <GiPathDistance/>
                              </span>
                            </OverlayTrigger>
                          </p>
                        )
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Marketplace


