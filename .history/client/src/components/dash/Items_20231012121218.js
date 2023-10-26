import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import {GiPathDistance} from 'react-icons/gi'
import MapsDirections from './MapsDirections';
import { SlLocationPin } from 'react-icons/sl';

const Items = (type) => {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [map, setMap] = useState(false);

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

  const handleGoogleMapsDirLink = (e, donorLocationInput, doneeLocationInput, index) => {
    e.preventDefault();

    const newTooltipVisibility = [...tooltipVisibility];
    newTooltipVisibility[index] = !newTooltipVisibility[index];
    setTooltipVisibility(newTooltipVisibility);
    
    const googleMapsLink = `https://www.google.com/maps/dir/${donorLocationInput}/${doneeLocationInput}`;

    window.open(googleMapsLink, "_blank");
  }

  const yourDirectionsObject = {
    routes: [
      {
        // Define a route object
        bounds: {
          // Define bounds for this route (optional)
          northeast: { lat: 37.7749, lng: -122.4194 }, // Replace with actual coordinates
          southwest: { lat: 34.0522, lng: -118.2437 }, // Replace with actual coordinates
        },
        legs: [
          {
            // Define legs of the route
            distance: {
              text: '400 mi', // Distance as text
              value: 643737,   // Distance in meters
            },
            duration: {
              text: '6 hours 30 mins', // Duration as text
              value: 23400,             // Duration in seconds
            },
            start_address: 'San Francisco, CA',  // Starting address
            end_address: 'Los Angeles, CA',      // Ending address
            steps: [
              // Define steps for the route
              // Each step includes instructions, distance, and duration
            ],
          },
        ],
      },
    ],
    status: 'OK', // Status of the request (e.g., 'OK', 'ZERO_RESULTS', 'OVER_QUERY_LIMIT')
  };

  return (
    <div className="d-flex align-content-start flex-wrap" >
    {map &&
      <MapsDirections
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      directions={yourDirectionsObject} // Replace with your directions data
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
                      onClick={(e) => setMap(true)}
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
                          <strong onClick={() => setMap(true)}>Directions</strong> <GiPathDistance/>
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