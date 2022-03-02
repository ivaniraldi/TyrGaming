import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="bgLanding">
      <h1 className="titleLanding">VIDEOGAMES APP</h1>
      <span className="subTitleLanding">
        A videogame app used to filtrate, search and create game caratules,
        created by Ivan Iraldi. Hope you enjoy it.
      </span>
      <Link to="/home">
        <button className="buttonLanding">ENTER</button>
      </Link>
    </div>
  );
}
