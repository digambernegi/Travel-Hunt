import React, { useState, useEffect } from "react";
import "./App.css";
import { Header, List, Map } from "./Components";
import { getPlaces, getWeatherData } from "./API/apiData";

function App() {
  //state variables
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [weather, setWeather] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [type, setType] = useState("Restaurant");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollTo, setScrollTo] = useState({});

  //retrieve use default geoLocation from Browser is location allow and set coordinates accordingly
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  //filtering places based on rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  //fetching api data on state change, proving bounds, type change and more...
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeather(data)
      );
      getPlaces(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [type, coordinates, bounds]);

  //render elements
  return (
    <>
      <div className="header">
        <Header setCoordinates={setCoordinates} />
      

      <div className="twocolgrid">
        <div className="leftSide">
          {getPlaces.length ? (
            <Map
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              places={filteredPlaces.length ? filteredPlaces : places}
              setScrollTo={setScrollTo}
              weather={weather}
            />
          ) : (
            "No data found"
          )}
        </div>

        <div className="rightSide">
          {getPlaces.length ? (
            <List
              loading={loading}
              places={filteredPlaces.length ? filteredPlaces : places}
              scrollTo={scrollTo}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          ) : (
            "No data found"
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
