import { Autocomplete, GoogleApiWrapper, Map } from 'google-maps-react';

const GoogleLocation = () => {

    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{ lat: 37.7749, lng: -122.4194 }}
      >
        <Autocomplete
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '16px',
            marginTop: '2px',
            marginBottom: '500px'
          }}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
        />
      </Map>
    );

}

export default GoogleLocation;