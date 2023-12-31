import React, { useRef, useEffect, forwardRef } from 'react'
import useGoogleMapsApi from './useGoogleMapsApi'

const LocationInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  const autocompleteRef = useRef()
  const googleMapsApi = useGoogleMapsApi()

  useEffect(() => {
    if (googleMapsApi) {
      autocompleteRef.current = new googleMapsApi.places.Autocomplete(inputRef.current, { types: ['(cities)'] })
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace()
        // Do something with the resolved place here (ie store in redux state)
      })
    }
  }, [googleMapsApi])

  const handleSubmit = (e) => {
    e.preventDefault()
    return false
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <label htmlFor='location'>Google Maps Location Lookup</label>
      <input
        name='location'
        aria-label='Search locations'
        ref={inputRef}
        placeholder='placeholder'
        autoComplete='off'
      />
    </form>
  )
}

export default LocationInput