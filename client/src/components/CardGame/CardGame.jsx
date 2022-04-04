import React from "react";
import "./CardGame.css";

export default function CardGame({name, img, genres, rating}) {
    return (
        <div className="container" style={{margin:"10px"}}>
            <div className="card bg-dark" style={{width:"500px"}}>
                <img className="card-img-top"
                    
                    src={img}
                    alt="Not Found"/>
                    
                <div className="container">
                    <div className="card-body">
                        <span></span>
                        <div>
                            <h3 className="card-title">
                                {name}</h3>
                        <p>Rating {rating}/5</p>
                            <arguments className="card-text"> {
                                typeof genres[0] === "object" ? genres.map((g) => <span className="card-text">
                                    {
                                    g.name + " - "
                                }</span>) : genres.map((g) => <span className="card-text">
                                    {
                                    g + " - "
                                }</span>)
                            } </arguments>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
