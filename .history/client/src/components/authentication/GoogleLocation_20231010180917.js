import "./styles.css";

import { useEffect, useRef } from "react";
const GoogleLocation = () => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  fields: ["address_components", "geometry", "icon", "name"],
 };
 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );
  autoCompleteRef.current.addListener("place_changed", async function () {
   const place = await autoCompleteRef.current.getPlace();
   console.log({ place });
  });
 }, []);
 return (
  <div>
   <label>enter address :</label>
   <input ref={inputRef} />
  </div>
 );
};
export default GoogleLocation;