import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import {GiPathDistance} from 'react-icons/gi'
import Map from './Map';
import { SlLocationPin } from 'react-icons/sl';
import { withScriptjs } from "react-google-maps";

const Items = (type) => {
  const [directions, setDirections] = useState(null);
  const directionsService = new window.google.maps.DirectionsService();
  const [map, setMap] = useState(false);
  const MapLoader = withScriptjs(Map);

  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);



  const [tooltipVisibility, setTooltipVisibility] = useState(new Array(items.length).fill(false));
  useEffect(() => {
    fetch('http://127.0.0.1:4000/api/main/get-items', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //If the user is a donor we simply need to access donor market items
        //if the user is a donee we need to donor market (all items user has claimed)
        request:localStorage.getItem("userType")
      })
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
        setItems(data.items);
        setItemIds(data.item_ids);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  useEffect(() => {
    // Fetch image data for each item
    itemIds.forEach((itemId) => {
      fetchImage(itemId);
    });
  }, [itemIds]);


  const handleGoogleMapsLink = (e, locationInput) => {
    e.preventDefault();
    const googleMapsLink = `https://www.google.com/maps?q=${locationInput}`;

    // Open the link in a new tab or window
    window.open(googleMapsLink, "_blank");
  };



  function displayDirections(e, item){
    e.preventDefault();
    setMap(true);
    setDirections({"origin":item.location, "destination": item.donee_location});
  }



  return (
    <div className="d-flex align-content-start flex-wrap" >
    {map &&
        <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4"
        directions={directions}
        className="google-map"
      />
    }
      {items.map((item, index) => (
        <div className="p-2">
            <div className="status">
              <p className="status-text">{item.status}</p>
            </div>
            
            <div key={itemIds[index]} className="card-item mb-4">
                <img src={`http://127.0.0.1:4000/api/main/get-image/${itemIds[index]}`} className="card-img-top img-fluid item-image" alt="Item" />
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    {item.status == "in_delivery" && localStorage.getItem("userType") != "volunteer" &&
                      <p className="card-text">Volunteer {item.volunteer_delivering}</p>
                    }

                  {type.type === 'donee' ? (
                    <p className="card-text">
                      <strong>Pickup</strong> <SlLocationPin onClick={(e) => handleGoogleMapsLink(e, item.donee_location)}/> {item.donee_location}
                    </p>
                  ) : type.type === "donor" ? (
                    <p className="card-text">
                      <strong>Item Drop Off </strong> <SlLocationPin onClick={(e) => handleGoogleMapsLink(e, item.location)}/> {item.location}
                    </p>
                  ) : type.type === "volunteer" ? (
                    <p
                      className={`card-text ${hovered ? 'hover-effect' : ''}`}
                      // handleGoogleMapsDirLink(e, item.location, item.donee_location, index)
                      onClick={(e) => displayDirections(e, item)}
                      onMouseEnter={() => {
                        setHovered(true);
                        setShowTooltip(true);
                      }}
                      onMouseLeave={() => {
                        setHovered(false);
                        setShowTooltip(false);
                      }}
                    >
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top-${index}`}>
                            {item.location} to {item.donee_location}
                          </Tooltip>
                        }
                        show={tooltipVisibility[index]}
                      >
                        <span>
                          <strong>Directions</strong> <GiPathDistance/>
                        </span>
                      </OverlayTrigger>
                    </p>

                  ) : null}


                </div>
            </div>
          </div>
      ))}
      
    </div>
 
  );

}

export default Items;