import React, {useEffect, useState} from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import  Homepage from "./Homepage";
import { Route, Switch, Link } from 'react-router-dom';
import Companies from './Companies';
import Products from './Products';
import Modal from "./Modal";
import Modalpro from './Modalpro';
import { Input } from 'antd';
import axios from 'axios';
import { configConsumerProps } from 'antd/es/config-provider';
const { Search } = Input;



function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [modalOpen, setModalOpen] =useState(false);
  const [modalOpenpro, setModalOpenpro] =useState(false);
  const [companyCount, setCompanyCount] = useState(0);
  const [latestProduct, setLatestProduct] = useState(null);


  const [rows, setRows] = useState([
    {
      company_id:1,
      company_name: "Company 1",
      company_legal_number: "12345",
      incorporation_country: "67890",
      website_url: "www.company1.com",
      company_status: "Live",
    },
    {
      company_id:2,
      company_name: "Company 2",
      company_legal_number: "54321",
      incorporation_country: "09876",
      website_url: "www.company2.com",
      company_status: "Live",
    }
  ]);

  
  
  const [rowsone, setRowsone] = useState([
    {
      product_id:1,
      product_name: "Product 1",
      product_category: "category",
      productAmount: "67890",
      product_unit: "",
      company_id: "",
      product_status: "Live",
      company_name:"",
    },
    {
      product_id:2,
      productName: "Product 2",
      product_category: "category",
      product_amount: "67890",
      product_unit: "",
      company_id: "",
      product_status: "Live",
      company_name:"",
    },
  
  ]);
  useEffect(() => {
    const companyData = async()=>{
 
     axios.get("http://localhost:9000/companies").then((res)=>{
       setRows(res.data)
    
     }).catch((err)=>console.log(err))
    }
    const productsData = async()=>{
 
     axios.get("http://localhost:9000/products").then((res)=>{
      setRowsone(res.data)
    
     }).catch((err)=>console.log(err))
    }
    companyData();
    productsData();
 
   }, [])
  
  const [rowToEditOne, setRowToEditOne] = useState(null);
  
  const handleDeleteRowOne = async (targetIndex) => {
    try {
      const model = {
        product_id: targetIndex,
      };
  
      const res = await axios.delete("http://localhost:9000/products", { data: model });
      console.log(res.status);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  
  
  const handleEditRowOne = (idx) => {
    setRowToEditOne(idx);
  
    setModalOpenpro(true);
  };
  
  const handleSubmitOne = (newRow) => {
    setRowToEditOne(null);
  
    setRowsone([...rowsone, newRow]);
  };
  
  
  const [rowToEdit, setRowToEdit] = useState(null);

  
const toggleForm = (forName) => {
  setCurrentForm(forName);
}

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };
  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (

    <div className="App">
      <Switch>
        <Route path='/Homepage'>
          <Homepage />
        </Route>
        <Route path='/Companies'>
          <Companies rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
          <button onClick={() => setModalOpen(true)} className='btn'  >
        Add
         </button>
        </Route>
        <Route path='/Products'>
         <Products rows={rowsone} deleteRow={handleDeleteRowOne} editRow={handleEditRowOne}/>
         <button onClick={() => setModalOpenpro(true)} className='btn'>
          Add
        </button>
        </Route>
        <Route path='/'> 
        {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        }
        </Route>
      </Switch>

         {
          modalOpen && (
            <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}
          {
          modalOpenpro && (
            <Modalpro
            closeModalOne={() => {
              setModalOpenpro(false);
              setRowToEditOne(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEditOne !== null && rowsone[rowToEditOne]}
            />
          )}
          

   
    </div>

  );
  
}


export default App;
