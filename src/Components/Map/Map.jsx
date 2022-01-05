import React from "react";
import "./Map.style.css";
import mapStyles from './mapStyles'
import GoogleMapReact from "google-map-react";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { useMediaQuery } from "@material-ui/core";

const Map = ({ coordinates, setCoordinates, setBounds, places,setScrollTo,weather }) => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        defaultZoom={5}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI:true, zoomControl:true, styles:mapStyles}}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setScrollTo(child)}
      >
        {places?.map((place, index) => (
          <div
            className="onMapMarker"
            key={index}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!matches ? (
              <LocationOnOutlinedIcon style={{ color: "red" }} />
            ) : (
              <div style={{objectFit: 'contain' }} class="box">
                <div class="img">
                  <img alt='img' style={{width:'100%' }}
                     src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}/>
                </div>
                <div class="info">{place.name}</div>
                <div class="info">{Number(place.rating)} <small> Star</small></div>

              </div>
            )}
          </div>
        ))}

{weather?.list?.map((data, index) => (
          <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
            <img className="weatherimg" alt="img" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
