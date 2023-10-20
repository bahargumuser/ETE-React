import React, {useState} from 'react';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import  Homepage from "./Homepage";
import { Route, Switch } from 'react-router-dom';
import Companies from './Companies';
import Products from './Products';
import Modal from "./Modal";


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [modalOpen, setModalOpen] =useState(false);

  const [rows, setRows] = useState( [
    {page: "Page1", description: "This is the first page", status: "Live"},
    {page: "Page2", description: "This is the second page", status: "Live"},
    {page: "Page3", description: "This is the third page", status: "Live"},
  ]);
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
        </Route>
        <Route path='/Products'>
          <Products rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
        </Route>
        <Route path='/'> 
        {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        }
        </Route>
      </Switch>


      
      <button onClick={() => setModalOpen(true)} className='btn'  >
        Add
         </button>
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
         

    </div>

  );
  
}


export default App;
