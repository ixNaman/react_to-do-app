import React from "react";
import logo from "../assets/todo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <img src={logo} className="image"></img>
      <h1>To-Do-List</h1>
    </div>
  );
};

export default Navbar;
