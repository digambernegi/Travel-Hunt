import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./Header.style.css";
import SearchIcon from "@material-ui/icons/Search";

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <div className="nav">
      <div className="nav__h4">
        <h2>Next Stop Hunt</h2>
      </div>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className="nav__input">
          <input type="text" placeholder="Search here..." />
          <SearchIcon className="nav__searchIcon" />
        </div>
      </Autocomplete>
    </div>
  );
};

export default Header;
