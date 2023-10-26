import Autocomplete from "react-google-autocomplete";
import React from 'react';

const GoogleLocation = () => {

    return (
        <Autocomplete
          apiKey="AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4"
          style={{ width: "90%" }}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "ru" },
          }}
          defaultValue="Amsterdam"
        />
    );
};

export default GoogleLocation;



