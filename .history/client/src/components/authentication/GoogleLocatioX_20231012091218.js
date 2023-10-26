import { Autocomplete, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
function GoogleLocationX() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4",
      libraries: ['places']
    })

    return (
      <div className="form-outline mb-4">
        <Autocomplete>
        <input
          type="email"
          id="form3Example3"
          className="form-control form-control-lg"
          ref={inputRef}
          placeholder="Enter your current address"
        />
        </Autocomplete>
        <label className="form-label" htmlFor="form3Example3">
          Address
        </label>
      </div>
    );
  }

    