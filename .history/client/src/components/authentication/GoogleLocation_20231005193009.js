import React from 'react';
import { usePlacesWidget } from "react-google-autocomplete";
const GoogleLocation = () => {
    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey:"AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4",
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



