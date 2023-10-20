import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Companies from './Companies';
import Products from './Products';
import { Route } from "react-router-dom";

function Homepage() {

  let history = useHistory();

  const handleChange  = (e) => {
    e.preventDefault();
    history.push("/Companies");
}
    return (
      <div className="Homepage" onSubmit={handleChange}>

        <h1 className='topic'>Statistic</h1>
        
        <Link to="/Companies">Companies</Link>
        <Link to="/Products">Products</Link>
        
  
      </div>
  
    );
  }
  
  export default Homepage;