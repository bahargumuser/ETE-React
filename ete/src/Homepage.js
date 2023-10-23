import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import CountUp from 'react-countup';
import { Col, Row, Statistic } from 'antd';


const formatter = (value) => <CountUp end={value} separator="," />;

function Homepage({rows}) {

  let history = useHistory();
  let activeCompany=0;

 rows.forEach((item)=>{
  item.company_status=="Live" && activeCompany++
 })
  const handleChange  = (e) => {
    e.preventDefault();
    history.push("/Companies");
}
    return (
      <div className="Homepage" onSubmit={handleChange}>
        <h1 className='topic'>Statistic</h1>

        <Row gutter={16}>
        <Col span={12} className="custom-statistic">
          <Statistic title="Active Companies" value={activeCompany} formatter={formatter} />
        </Col>
      </Row>
        
        <Link to="/Companies" className="custom-link">Companies</Link>
        <Link to="/Products" className="custom-link1">Products</Link>
        
  
      </div>
  
    );
  }
  
  export default Homepage;