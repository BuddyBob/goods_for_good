import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef } from "react";

const GoogleLocatioX = () => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4",
      libraries: ['places']
    })

    const inputRef = useRef();

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