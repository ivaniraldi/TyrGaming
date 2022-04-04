import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="container">
      <div className="container-fluid" style={{marginTop:"150px"}}>
      <div className="row">
      <div className="col">
        <div className="card" style={{padding:"20px"}}>
          <div className="container">
      <h1 className="titleLanding">Welcome to TýrGaming</h1>
      <h3 className="subTitleLanding">
        Search for a caratule that likes you, view the game info and create your own!
      </h3>
      </div>
      <div className="container-fluid"style={{marginTop:"20px"}}>
      <Link to="/home">
        <button className="btn btn-dark">Lets play!</button>
      </Link>
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}
