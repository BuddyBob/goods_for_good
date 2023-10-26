import React from 'react';
import { usePlacesWidget } from "react-google-autocomplete";
const GoogleLocation = () => {
    const { ref, autocompleteRef } = usePlacesWidget({
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



