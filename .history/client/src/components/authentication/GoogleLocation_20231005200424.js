// AddressSelection.js

import React, { useEffect } from 'react';

function AddressSelection() {
  const CONFIGURATION = {
    "ctaTitle": "Checkout",
    "mapOptions": {
      "center": { "lat": 37.4221, "lng": -122.0841 },
      "fullscreenControl": true,
      "mapTypeControl": false,
      "streetViewControl": true,
      "zoom": 9,
      "zoomControl": true,
      "maxZoom": 22,
      "mapId": ""
    },
    "mapsApiKey": "AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4", // Replace with your Google Maps API key
    "capabilities": {
      "addressAutocompleteControl": true,
      "mapDisplayControl": true,
      "ctaControl": true
    }
  };

  const componentForm = [
    'location',
    'locality',
    'administrative_area_level_1',
    'country',
    'postal_code',
  ];

  useEffect(() => {
    function initMap() {
      // Your initMap function here
      const map = new window.google.maps.Map(document.getElementById("gmp-map"), {
        zoom: CONFIGURATION.mapOptions.zoom,
        center: CONFIGURATION.mapOptions.center,
        mapTypeControl: false,
        fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
        zoomControl: CONFIGURATION.mapOptions.zoomControl,
        streetViewControl: CONFIGURATION.mapOptions.streetViewControl
      });

      const marker = new window.google.maps.Marker({ map: map, draggable: false });
      const autocompleteInput = document.getElementById('location-input');
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput, {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      });

      autocomplete.addListener('place_changed', function () {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert('No details available for input: \'' + place.name + '\'');
          return;
        }
        renderAddress(place);
        fillInAddress(place);
      });

      function fillInAddress(place) {
        const addressNameFormat = {
          'street_number': 'short_name',
          'route': 'long_name',
          'locality': 'long_name',
          'administrative_area_level_1': 'short_name',
          'country': 'long_name',
          'postal_code': 'short_name',
        };
        const getAddressComp = function (type) {
          for (const component of place.address_components) {
            if (component.types[0] === type) {
              return component[addressNameFormat[type]];
            }
          }
          return '';
        };
        document.getElementById('location-input').value = getAddressComp('street_number') + ' ' + getAddressComp('route');
        for (const component of componentForm) {
          if (component !== 'location') {
            document.getElementById(component + '-input').value = getAddressComp(component);
          }
        }
      }

      function renderAddress(place) {
        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      }
    }

    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4&libraries=places&callback=initMap&solution_channel=GMP_QB_addressselection_v1_cABC`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up the script tag if the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="card-container">
      <div className="panel">
        <div>
          <img className="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="" />
          <span className="sb-title">Address Selection</span>
        </div>
        <input type="text" placeholder="Address" id="location-input" />
        <input type="text" placeholder="Apt, Suite, etc (optional)" />
        <input type="text" placeholder="City" id="locality-input" />
        <div className="half-input-container">
          <input type="text" className="half-input" placeholder="State/Province" id="administrative_area_level_1-input" />
          <input type="text" className="half-input" placeholder="Zip/Postal code" id="postal_code-input" />
        </div>
        <input type="text" placeholder="Country" id="country-input" />
        <button className="button-cta">{CONFIGURATION.ctaTitle}</button>
      </div>
      <div className="map" id="gmp-map"></div>
    </div>
  );
}

export default AddressSelection;
