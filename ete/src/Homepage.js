import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Companies from './Companies';
import Products from './Products';
import { Route } from "react-router-dom";

function Homepage() {
  const [companies, setCompanies] = useState('')

  let history = useHistory();

  const handleChange  = (e) => {
    e.preventDefault();
    history.push("/Companies");
}


    return (
      <div className="Homepage" onSubmit={handleChange}>
    
     
        <h1 className='topic'>Statistic</h1>
        <button type="submit">Companies</button>
        <button type="submit">Products</button>
  
      </div>
  
    );
  }
  
  export default Homepage;