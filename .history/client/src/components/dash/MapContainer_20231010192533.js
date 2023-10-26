import { GoogleApiWrapper, Map } from 'google-maps-react';
import React, { Component } from 'react';

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14} // Set your desired initial zoom level
        initialCenter={{ lat: 37.7749, lng: -122.4194 }} // Set the initial center coordinates
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4' // Replace with your Google Maps API key
})(MapContainer);