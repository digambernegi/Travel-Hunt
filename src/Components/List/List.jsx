import React, { useState, useEffect, createRef } from "react";
import { CircularProgress } from "@material-ui/core";
import "./List.style.css";
import Card from "../Card/Card";

const List = ({
  loading,
  places,
  childClicked,
  type,
  setType,
  rating,
  setRating,
}) => {

  console.log({childClicked});
  const [ref, setRef] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, index) => ref[index] || createRef());
    setRef(refs);
  }, [places]);

  return (
    <div className="list">
      <div style={{ textAlign: "center" }} className="list__title">
        <h4>Discover Hotels & Restaurants</h4>
      </div>
      {loading ? (
        <div className="loadingstate">
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <>
          <form className="form">
            <label htmlFor="type">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              ClassName="byType"
              id="type"
            >
              <option value="restaurants">Restaurants</option>
              <option value="hotels">Hotels</option>
              <option value="attractions">Attractions</option>
            </select>

            <label htmlFor="ratings">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              ClassName="byRating"
              id="ratings"
            >
              <option value="">All</option>
              <option value="3">Above 3.0</option>
              <option value="4">Above 4.0</option>
              <option value="5">5 & above</option>
            </select>
          </form>

          {places?.map((place, index) => (
            <div ref={ref[index]} key={index} className="allCards">
              <Card
                place={place}
                refProp={ref[index]}
                selected={Number(childClicked) === index}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default List;
