import { DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai'

const Map = (props) => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);

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
          const distanceValue = result.routes[0].legs[0].distance.text;
          setDistance(distanceValue);
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
      <AiOutlineClose style={{zIndex: '5001', width:"10%", top: '20px'}} className="addpopup-close" onClick={() => props.onClose()} />
      <div className="google-map-data">
        <div className="col">
          <p className="maps-data text-center">Distance: {distance}</p>
        </div>
        <div className="col">
          <p className="maps-data text-center">Service Hours: 10</p>
        </div>
      </div>
      <GoogleMapExample
        containerElement={<div style={{ background: "#eeeeee", padding:"30px", paddingTop: "80px", borderRadius:"10px",   height: `100%`, width: '30%', position: 'absolute', zIndex: '5000', left: '10px', top: '10px'}}  />}
        mapElement={<div style={{ height: `100%`, borderRadius: "10px" }} />}
      />
    </div>
  );
};

export default Map;
