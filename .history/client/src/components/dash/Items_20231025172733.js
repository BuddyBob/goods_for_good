import { OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import ConfirmPopup from "./ConfirmPopup";
import { GiPathDistance } from "react-icons/gi";
import Map from "./Map";
import { SlLocationPin } from "react-icons/sl";
import { withScriptjs } from "react-google-maps";

const Items = ({ type }) => {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(false);
  const MapLoader = withScriptjs(Map);

  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [popup, setPopup] = useState(false);
  const [itemData, setItemData] = useState(null);

  const [tooltipVisibility, setTooltipVisibility] = useState(
    new Array(items.length).fill(false)
  );
  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/main/get-items", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //If the user is a donor we simply need to access donor market items
        //if the user is a donee we need to donor market (all items user has claimed)
        request: localStorage.getItem("userType"),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("No items found");
        }
      })
      .then((data) => {
        console.log(data);
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
          throw new Error("Image not found");
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

  const displayDirections = (e, item) => {
    e.preventDefault();
    setMap(true);
    setDirections({ origin: item.location, destination: item.donee_location });
  };

  const beginDelivery = (item, index) => {
    fetch("http://127.0.0.1:4000/api/main/begin-delivery", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemIds[index],
        item: item,
        duration: null,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("No items found");
        }
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const confirmDelivery = (item, index) => {
    setItemData({ item: item, itemId: itemIds[index] });
    setPopup(true);
  };

  const handleClosePopup = (value) => {
    // Make a decision based on the value passed from ConfirmPopup
    if (value === "success") {
      setPopup(false);
      window.location.reload();
    } else if (value === "exit") {
      setPopup(false);
    }
  };

  const getStatusColor = (status) =>  {
    const colorMap = {
      available: '#A9D0EB',
      needs_delivery: '#FFB56B',
      pre_delivery: '#F5DB93',
      en_route: '#C1AEFF',
      delivered: '#A9EBC4'
    };

    return colorMap[status]
  }

  return (
    <>
      {popup && (
        <ConfirmPopup props={itemData} onClose={handleClosePopup} />
      )}

      <div className={`d-flex align-content-start flex-wrap item-container ${popup ? 'blur-background' : ''}`}>
        {map && (
          <MapLoader
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4"
            loadingElement={<div style={{ height: "100%" }} />}
            directions={directions}
            onClose={() => setMap(false)}
            className="google-map"
          />
        )}

        {items.map((item, index) => (
          <div className="p-2">
            {
              //if it is in delivery and the user is not a volunteer show the status but if it is in delivery the volunteer should be able to
              //start the delivery
              type !== "volunteer" && (
                <div className="row">
                  <div className="status1 col-4">
                    <p className="status-text">Status</p>
                  </div>
                  <div className="status2 col-7"  style={{ color: getStatusColor(item.status) }}>
                    <p className="status-text">{item.status}</p>
                  </div>
                </div>
              )
            }
            {type == "volunteer" && item.status !== "pre_delivery" && (
              <div className="row">
                <div className="status1 col-4">
                  <p className="status-text">Status</p>
                </div>
                <div className="status2 col-7">
                  <p className="status-text">{item.status}</p>
                </div>
              </div>
            )}
            {
              //The item has found a volunteer for delivery -> volunteer should be able to start the delivery
              type == "volunteer" && item.status === "pre_delivery" && (
                <button className="btn btn-primary mb-2"onClick={() => beginDelivery(item, index)}>
                  Begin Delivery
                </button>
              )
            }

            <div key={itemIds[index]} className="card-item mb-4">
              <img
                src={`http://127.0.0.1:4000/api/main/get-image/${itemIds[index]}`}
                className="card-img-top img-fluid item-image"
                alt="Item"
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                {item.status == "pre_delivery" && type != "volunteer" && (
                  <p className="card-text">Volunteer {item.volunteer_delivering}</p>
                )}

                {type === "donee" ? (
                  <p className="card-text">
                    <strong onClick={(e) => handleGoogleMapsLink(e, item.donee_location)}>Pickup</strong>{" "}
                    <SlLocationPin /> {item.donee_location}
                  </p>
                ) : type === "donor" ? (
                  <p className="card-text">
                    <strong onClick={(e) => handleGoogleMapsLink(e, item.location)}>Item Drop Off{" "}</strong>{" "}
                    <SlLocationPin /> {item.location}
                  </p>
                ) : type === "volunteer" ? (
                  <p
                    className={`card-text ${hovered ? "hover-effect" : ""}`}
                    onClick={(e) => displayDirections(e, item)}
                    onMouseEnter={() => {setHovered(true);setShowTooltip(true);}}
                    onMouseLeave={() => {setHovered(false);setShowTooltip(false);}}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-top-${index}`}> {" "}{item.location} to {item.donee_location}</Tooltip>}
                      show={tooltipVisibility[index]}
                    >
                      <span><strong>Directions</strong> <GiPathDistance /></span>
                    </OverlayTrigger>
                  </p>
                ) : null}

                {/* volunteer confirm delivery successful */}
                {type === "volunteer" && item.status === "en_route" && (
                  <button className="btn btn-primary mt-2" onClick={() => confirmDelivery(item, index)}>
                    Confirm Delivery
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Items;
