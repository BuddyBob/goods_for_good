import "./style.css";

import React, { Component } from "react";

import InfoWindow from "./infowindow";
import Map from "./Map";

class GoogleLocation extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
    this.handleLocationError = this.handleLocationError.bind(this);
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  render() {
    return (
      <Map
        id="myMap"
        options={{
          center: { lat: 41.0082, lng: 28.9784 },
          zoom: 8,
        }}
        onMapLoad={(map) => {
          let infoWindow = new google.maps.InfoWindow(); // Try HTML5 geolocation.

          navigator.geolocation.getCurrentPosition(
            function (position) {
              let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            function (error) {
              infoWindow.setPosition(map.getCenter());
              infoWindow.setContent(
                true
                  ? "Error: The Geolocation service failed."
                  : "Error: Your browser doesn't support geolocation."
              );
              infoWindow.open(map);
            }
          );
        }}
      />
    );
  }
}

export default GoogleLocation;