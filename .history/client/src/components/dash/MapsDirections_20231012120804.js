import { DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from '@react-google-maps/api';

import React from 'react';

const MapsDirections = (props) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 37.7749, lng: -122.4194 }} // Replace with your default center coordinates
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
};

export default MapsDirections;
