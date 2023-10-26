import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef } from "react";

const GoogleLocatioX = () => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4",
      libraries: ['places']
    })

    const inputRef = useRef();

    useEffect(inputRef =>
      {
        if (isLoaded) {
          const autoCompleteRef = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types: ['geocode'] }
          );
          autoCompleteRef.setFields(['address_components', 'formatted_address']);
          autoCompleteRef.addListener('place_changed', () => {
            const place = autoCompleteRef.getPlace();
            console.log(place);
          });
        }
      }
    );

    return (
      <div className="form-outline mb-4">
        <Autocomplete>
        <input
          type="email"
          id="form3Example3"
          className="form-control form-control-lg"
          ref={inputRef}
          placeholder="Enter your current address"
        />
        </Autocomplete>
        <label className="form-label" htmlFor="form3Example3">
          Address
        </label>
      </div>
    );
  }

export default GoogleLocatioX;