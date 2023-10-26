import React, { useEffect, useRef } from "react";

const GoogleLocation = ({handleLocationChange}) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "usa" },
    fields: ["address_components", "geometry", "icon", "name"],
  };

  useEffect(() => {
    // Check if the Google Maps API is loaded, or use a similar method
    if (window.google && window.google.maps) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      autoCompleteRef.current.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();
        console.log({ place });
      });
    }
  }, []);

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

export default GoogleLocation;
