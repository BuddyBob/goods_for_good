import { GoogleApiWrapper, Map } from "google-maps-react";
import React, { useEffect, useState } from "react";
const DrivingRoute = ({ origin, destination, google }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin: origin,
      destination: destination,
      travelMode: "DRIVING",
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        setDirections(result);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [origin, destination, google]);

  if (directions) {
    // Create a new DirectionsRenderer and set it on the map
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: google.maps,
      directions: directions,
    });

    return (
      <div>
        <h2>Driving Directions:</h2>
        <ol>
          {directions.routes[0].legs.map((leg, index) => (
            <li key={index}>
              {leg.start_address} to {leg.end_address} ({leg.distance.text}, {leg.duration.text})
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return <div>Loading directions...</div>;
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4' // Replace with your Google Maps API key
  })(MapContainer);
