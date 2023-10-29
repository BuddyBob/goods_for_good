import { DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai'

const Map = (props) => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

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
          
          const route = result.routes[0].legs[0];
          setDistance(route.distance.text);
          setDuration(route.duration.text);
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
      <button className="add-popup-close" onClick={() => {console.log("yo")}}>
      <AiOutlineClose  />
      </button>


      <div className="google-map-data row">
        <div className="col-6">
          <p className="maps-data-text">Distance: {distance}</p>
        </div>
        <div className="col-7">
          <p className="maps-data-text">Service Hours: {duration}</p>
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
