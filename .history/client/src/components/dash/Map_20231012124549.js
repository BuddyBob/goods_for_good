import {
  DirectionsRenderer,
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import React, { useEffect, useState } from "react";
/*global google*/

const Map = ({props}) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: props.origin,
        destination: props.destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, []);

  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
      defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
      defaultZoom={13}
    >
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
  ));

  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default Map;
