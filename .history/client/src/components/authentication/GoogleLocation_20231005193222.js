import React from 'react';
import Autocomplete from "react-google-autocomplete";

const GoogleLocation = () => {

    return (
        <Autocomplete
          apiKey={YOUR_GOOGLE_MAPS_API_KEY}
          style={{ width: "90%" }}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "ru" },
          }}
          defaultValue="Amsterdam"
        />;
    );
};

export default GoogleLocation;



