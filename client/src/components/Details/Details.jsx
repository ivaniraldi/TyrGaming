import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetDetails } from "../../action";
import SearchBar from "../SearchBar/SearchBar";
import "./Details.css";

export default function Details() {
  let resp = useSelector((state) => state.detail);

  return (
    <div>
      <SearchBar></SearchBar>
      {resp && resp.platforms && resp.genres ? (
        <div className="container" style={{padding:"20px"}}>
          <div className="card w-50"
          >
            <img className="card-img-top" src={resp.img} alt="Not found Img" />
            <div className="container">
            <h2 className="card-title">{resp.name}</h2>


            <p className="card-subtitle mb-2 text-muted">Rating: {resp.rating}</p>
            <p className="card-subtitle mb-2 text-muted">
              Genre:{" "}
              {resp.genres !== undefined
                ? resp.genres.map((g) => g.name + " - ")
                : "Empty"}
            </p>

            <p className="conteinDesc">Description:{resp.description}</p>

            <p className="p">Released: {resp.released}</p>
            {typeof resp.id === "string" ? (
              <p className="p">
                Platforms:{" "}
                {resp.platforms !== undefined
                  ? resp.platforms.map((p) => p.split(" ").join(" - "))
                  : "empty"}
              </p>
            ) : (
              <p className="p">
                Platforms:{" "}
                {resp.platforms !== undefined
                  ? resp.platforms.map((p) => p.name + " - ")
                  : "empty"}
              </p>
            )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
