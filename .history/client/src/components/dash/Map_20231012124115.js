import {
  DirectionsRenderer,
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
/*global google*/
import React, { Component } from "react";
class Map extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = '1400 Mission Street, San Francisco, CA, United States'
    const destination = '1539 Felton Street, San Francisco, CA, United States';

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
