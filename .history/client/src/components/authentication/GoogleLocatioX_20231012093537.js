import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from "react";

const GoogleLocatioX = () => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4",
      libraries: ['places']
    })

    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);

    const [selectedAddress, setSelectedAddress] = useState('');
    useEffect(() => {
      if (isLoaded) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place && place.formatted_address) {
            setSelectedAddress(place.formatted_address);
          }
        });
      }
    }, [isLoaded]);
  
    return (
      <div className="form-outline mb-4">
        <input
          type="email"
          id="form3Example3"
          className="form-control form-control-lg"
          ref={inputRef}
          placeholder="Enter your current address"
        />
        <label className="form-label" htmlFor="form3Example3">
          Address
        </label>
        {selectedAddress && <p>Selected Address: {selectedAddress}</p>}
      </div>
    );
  };
  
  export default GoogleLocationX;
  In this updated code, we use the useEffect hook to add an event listener to the Autocomplete input when the Google Maps library is loaded. The event listener listens for the 'place_changed' event and updates the selectedAddress state when a place is selected. This should ensure that the handlePlaceSelect function is triggered when an address is selected.
  
  
  
  
  
  