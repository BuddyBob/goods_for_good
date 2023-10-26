import React, { useEffect, useRef, useState } from 'react';

export default function GoogleAuto() {
  const [predictions, setPredictions] = useState([]);
  const [input, setInput] = useState('');
  const [selectedPlaceDetail, setSelectedPlaceDetail] = useState({});
  const predictionsRef = useRef();
  const autocompleteService = useRef(); // Define autocompleteService

  useEffect(() => {
    // Initialize autocompleteService
    autocompleteService.current = new window.google.maps.places.AutocompleteService();

    try {
      autocompleteService.current.getPlacePredictions({ input }, (predictions) => {
        setPredictions(predictions);
      });
    } catch (err) {
      // Handle the error here
      console.error(err);
    }
  }, [input]);

  const handleAutoCompletePlaceSelected = (placeId) => {
    if (window.google) {
      const PlacesService = new window.google.maps.places.PlacesService(predictionsRef.current);
      try {
        PlacesService.getDetails(
          {
            placeId,
            fields: ['address_components'],
          },
          (place) => setSelectedPlaceDetail(place)
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <input onChange={(e) => setInput(e.currentTarget.value)} />
      <div ref={predictionsRef}>
        {predictions.map((prediction) => (
          <div key={prediction.place_id} onClick={() => handleAutoCompletePlaceSelected(prediction.place_id)}>
            {prediction.description}
          </div>
        ))}
      </div>
    </div>
  );
}
