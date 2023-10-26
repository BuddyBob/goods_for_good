import "./styles.css";

import { useEffect, useRef } from "react";

const GoogleLocation = () => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "ng" },
  fields: ["address_components", "geometry", "icon", "name"],
  types: ["establishment"]
 };
 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );
 }, []);
 return (
  <div>
   <label>enter address :</label>
   <input ref={inputRef} />
  </div>
 );
};
export default GoogleLocation;