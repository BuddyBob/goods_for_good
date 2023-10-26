import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const GoogleLocationX = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY',
    libraries: ['places'],
  });

  const [selectedAddress, setSelectedAddress] = useState('');

  const handlePlaceSelect = (place) => {
    const address = place.formatted_address;
    setSelectedAddress(address);
  };

  return (
    <div className="form-outline mb-4">
      {isLoaded && (
        <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}>
          <input
            type="email"
            id="form3Example3"
            className="form-control form-control-lg"
            ref={inputRef}
            placeholder="Enter your current address"
            onChange={(e) => setSelectedAddress(e.target.value)}
          />
        </Autocomplete>
      )
      <label className="form-label" htmlFor="form3Example3">
        Address
      </label>
      {selectedAddress && <p>Selected Address: {selectedAddress}</p>}
    </div>
  );
};

export default GoogleLocationX;
