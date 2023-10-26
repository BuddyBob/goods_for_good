import Autocomplete from "react-google-autocomplete";
import React from 'react';
const GoogleLocation = () => {
    return (
        <div>
            <Autocomplete
                apiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
                onPlaceSelected={(place) => {
                console.log(place);
                }}
                />;
        </div>
    );
};

export default GoogleLocation;
