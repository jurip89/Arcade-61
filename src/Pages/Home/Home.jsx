import React from "react";
import { NavLink } from "react-router-dom";
import './style.css'
const Home = () => {
  return (
    <div className="body">
      <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label htmlFor="menu-icon"></label>
  	<nav className="nav"> 		
  		<ul className="pt-5">
  			<li><NavLink to="/juri">Juri</NavLink></li>
  			<li><NavLink to="juan">Juan</NavLink></li>
  			<li><NavLink to="maria">Maria</NavLink></li>
  			<li><NavLink to="simeon">Simeon</NavLink></li>
  		</ul>
  	</nav>

  	<div className="section-center">
  		<h1 className="mb-0">Arcade-61</h1>
  	</div>
    </div>
  );
};

export default Home;
