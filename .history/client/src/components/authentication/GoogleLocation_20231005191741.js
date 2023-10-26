import Autocomplete from "react-google-autocomplete";
import React from 'react';
const GoogleLocation = () => {
    return (
        <div>
            <Autocomplete
                apiKey="AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4"
                onPlaceSelected={(place) => {
                console.log(place);
                }}
                />;
        </div>
    );
};

export default GoogleLocation;
