import React from 'react';
import { usePlacesWidget } from "react-google-autocomplete";
const GoogleLocation = () => {
    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey:YOUR_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => {
          console.log(place);
        }
      });
    return (
        <div>
            <input ref={autocompleteRef} type="text" />
        </div>
    );
};

export default GoogleLocation;



