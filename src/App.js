import React, { useState, useEffect } from "react";
import "./App.css";
import { Header, List, Map } from "./Components";
import { getPlaces,getWeatherData } from "./API/apiData";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({});
  const[weather,setWeather]=useState([]);
  const[filteredPlaces,setFilteredPlaces]=useState([])
  const[type,setType] = useState('restaurant');
  const[rating,setRating] = useState('');
  const[loading,setLoading]=useState(false)
  const[scrollTo,setScrollTo]=useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces=places.filter((place) => place.rating>rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne){
    setLoading(true)
    /* getWeatherData(coordinates.lat, coordinates.lng).then((data) => setWeather(data)); */
    getPlaces(bounds.sw, bounds.ne).then((data) => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
    setLoading(false)

    })};
  }, [type, bounds]);

  return (
    <>
      <div className="header">
        <Header setCoordinates={setCoordinates}/>
      </div>

      <div className="twocolgrid">
        <div className="leftSide">
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces.length? filteredPlaces : places}
            setScrollTo={setScrollTo}
            weather={weather}
          />
        </div>

        <div className="rightSide">
          <List 
          loading={loading}
          places={filteredPlaces.length? filteredPlaces : places} 
            scrollTo={scrollTo}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            />
        </div>
      </div>
    </>
  );
}

export default App;
