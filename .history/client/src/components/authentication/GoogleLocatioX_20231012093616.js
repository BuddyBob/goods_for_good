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
      </div>
    );
  };
  
  export default GoogleLocatioX;

  
  
  
  
  