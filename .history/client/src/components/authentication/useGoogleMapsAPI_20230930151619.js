import { useCallback, useEffect, useState } from 'react'

import each from 'lodash/each'
import loadScript from 'load-script'

var googleMapsApi
var loading = false
var callbacks = []

const useGoogleMapsApi = () => {
  const [, setApi] = useState()

  const callback = useCallback(() => {
    setApi(window.google.maps)
  }, [])

  useEffect(() => {
    if (loading) {
      callbacks.push(callback)
    } else {
      if (!googleMapsApi) {
        loading = true
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=AIzaSyClyIN7tY--ySC4EENZWWqBsdbq0ZlcSgA&libraries=places`,
          { async: true },
          () => {
            loading = false
            googleMapsApi = window.google.maps
            setApi(window.google.maps)
            each(callbacks, init => init())
            callbacks = []
          })
      }
    }
  }, [])

  return googleMapsApi
}

export default useGoogleMapsApi