import React, { useEffect, useState } from "react";

// Create a component to display the driving route
const DrivingRoute = ({ origin, destination, google }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    // Create a DirectionsService
    const directionsService = new window.google.maps.DirectionsService();

    // Define the request
    const request = {
      origin: origin,
      destination: destination,
      travelMode: "DRIVING",
    };

    console.log(request)

    // Fetch directions
    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        setDirections(result);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [origin, destination]);

  if (directions) {
    // Render the driving route on the map
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      directions,
      map: google.map, // Replace 'map' with your map instance
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

export default DrivingRoute;