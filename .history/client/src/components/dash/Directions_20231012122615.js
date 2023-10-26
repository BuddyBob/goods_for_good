import React, { Component } from "react";
import { compose, withProps } from "recompose";

import DirectionRenderComponent from "./DirectionRenderComponent";

const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");
class Directions extends Component {
  state = {
    defaultZoom: 5,
    map: null,
    center: {
      lat: 23.217724,
      lng: 72.667216
    }
  };
  render() {
    return (
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        center={this.state.center}
        defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
      >
            <DirectionRenderComponent
              from='1539 Felton Street, San Francisco, CA, United States'
              to='1400 Mission Street, San Francisco, CA, United States'
            />
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + 'AIzaSyCMrvLBCs3yXow_vJIeYbqnaGuj1KEnGW4' + '&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions);