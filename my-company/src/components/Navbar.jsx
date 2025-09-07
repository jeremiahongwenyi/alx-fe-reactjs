import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav
        style={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "darkgray",
          justifyContent: "center",
        }}
      >
        <h1>My Company</h1>
        <ul
          style={{
            listStyle: "none",
            marginLeft: "auto",
            display: "flex",
            gap: "10px",
          }}
        >
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="services">Services</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
