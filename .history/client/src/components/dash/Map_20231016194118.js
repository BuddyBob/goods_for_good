import { DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai'

const Map = (props) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    console.log(props)
    directionsService.route(
      {
        origin: props.directions.origin,
        destination: props.directions.destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [props.origin, props.destination]);

  const GoogleMapExample = withGoogleMap((props) => (
    <GoogleMap defaultCenter={{ lat: 40.756795, lng: -73.954298 }} defaultZoom={13}>
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
  ));

  return (
    <div>
      <AiOutlineClose style={{zIndex: '5001',  left: '500px', top: '10px'}} className="addpopup-close" onClick={() => props.onClose()} />
      <GoogleMapExample
        containerElement={<div style={{ background: "#eeeeee", padding:"20px",   height: `500px`, width: '600px', position: 'absolute', zIndex: '5000', left: '10px', top: '10px'}}  />}
        mapElement={<div style={{ height: `100%`, borderRadius: "10px" }} />}
      />
    </div>
  );
};

export default Map;
