import { DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { useEffect, useState } from 'react';

const MapWithADirectionsRenderer = withScriptjs(withGoogleMap(props => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route({
      origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
      destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }, []);

  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}));

export default MapWithADirectionsRenderer;
