import React, {useState} from 'react';
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
const { Search } = Input;



function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [modalOpen, setModalOpen] =useState(false);
  const [modalOpenpro, setModalOpenpro] =useState(false);
  const [companyCount, setCompanyCount] = useState(0);
  const [latestProduct, setLatestProduct] = useState(null);


  const [rows, setRows] = useState([
    {
      companyName: "Company 1",
      legalNumber: "12345",
      incorporationLegalNumber: "67890",
      website: "www.company1.com",
      status: "Live",
    },
    {
      companyName: "Company 2",
      legalNumber: "54321",
      incorporationLegalNumber: "09876",
      website: "www.company2.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },

    {
      companyName: "Company 3",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
    {
      companyName: "Company 0",
      legalNumber: "98765",
      incorporationLegalNumber: "43210",
      website: "www.company3.com",
      status: "Live",
    },
  ]);
  const [rowsone, setRowsone] = useState([
    {
      productName: "Product 1",
      productCategory: "category",
      productAmount: "67890",
      amountUnit: "",
      companyName: "",
      status: "Live",
    },
    {
      productName: "Product 2",
      productCategory: "category",
      productAmount: "67890",
      amountUnit: "",
      companyName: "",
      status: "Live",
    },
    {
      productName: "Product 3",
      productCategory: "category",
      productAmount: "67890",
      amountUnit: "",
      companyName: "",
      status: "Live",
    },
  ]);
  
  const [rowToEditOne, setRowToEditOne] = useState(null);
  
  const handleDeleteRowOne = (targetIndex) => {
    setRowsone(rowsone.filter((_, idx) => idx !== targetIndex));
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
         <Products rows={rows} deleteRow={handleDeleteRowOne} editRow={handleEditRowOne}/>
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
