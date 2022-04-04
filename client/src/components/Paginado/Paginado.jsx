import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ xPage, result, paginate, next, previous }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(result / xPage); i++) {
    pageNumber.push(i);
  }
  //  console.log(pageNumber, '------------console log page number')
  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="container-fluid">
        <button className="btn btn-outline-light" onClick={() => paginate(previous)}>
          {" "}
          PREV{" "}
        </button>
        {pageNumber.map((number) => (
          <li className={styles.p_li} key={number}>
            <div className={styles.a_li}>
              <button
                className="btn btn-dark"
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </div>
          </li>
        ))}
        <button className="btn btn-outline-light"onClick={() => paginate(next)}>
          {" "}
          NEXT{" "}
        </button>
      </ul>
    </nav>
  );
}
