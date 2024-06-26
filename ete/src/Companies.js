import React, { useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';
import { Pagination } from 'antd';
import { Input } from 'antd';
import Modal from './Modal';

const { Search } = Input;

function Companies  ({rows, deleteRow, editRow})  {
    const [companiesData, setCompaniesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchedRows, setSearchedRows] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddCompany = () => {
        setModalOpen(true);
      };

      const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    

    const itemsPerPage = 10; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const currentItems = searchedRows ? searchedRows : rows.slice(startIndex, endIndex);


    const handleSearch = (value) => {
        const searchResult = rows.filter((row) => {
            return row.company_name.toLowerCase().includes(value.toLowerCase());
        });

        setSearchedRows(searchResult);
    };

      return (
        <div className="Companies">
            <Search
                placeholder="Search company..."
                onSearch={handleSearch}
                className='search'
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Legal Number</th>
                        <th>Incorporation Country</th>
                        <th>Website</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, idx) => {
                        const statusText =
                            row.company_status.charAt(0).toUpperCase() + row.company_status.slice(1);
                            {searchedRows ? (
                                searchedRows.map((row, idx) => {
                                })
                            ) : (
                                currentItems.map((row, idx) => {
                                    // ...
                                })
                            )}
    
                        return (
                            <tr key={idx}>
                                <td>{row.company_name}</td>
                                <td>{row.company_legal_number}</td>
                                <td>{row.incorporation_country}</td>
                                <td>{row.website_url}</td>
                                <td>
                                    <span className={`label-live`}>
                                        {statusText}
                                    </span>
                                </td>
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(idx)}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(idx)}
                                        />
                                    </span>
                                </td>
                            </tr>
                            
                        );
                    })}
                </tbody>
            </table>
            <Pagination
                current={currentPage}
                total={rows.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange} 
            />
            
            {modalOpen && (
        <Modal
          closeModal={() => setModalOpen(false)}
          onSubmit={async (newCompany) => {
            try {
              const response = await axios.post('http://localhost:9000/companies', newCompany);
              console.log("Company Add Secceful.", response.data);
            } catch (error) {
              console.error("Company error:", error);
            }
            setModalOpen(false);
          }}
          />
            )}
    
        </div>
        
    );
}

export default Companies;