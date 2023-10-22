import { AudioOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';
import { Pagination } from 'antd';
import { Input, Space } from 'antd';
const { Search } = Input;

function Companies  ({rows, deleteRow, editRow})  {
    const [companiesData, setCompaniesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchedRows, setSearchedRows] = useState(null);

      const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 10; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const currentItems = searchedRows ? searchedRows : rows.slice(startIndex, endIndex);


    const handleSearch = (value) => {
        const searchResult = rows.filter((row) => {
            return row.companyName.toLowerCase().includes(value.toLowerCase());
        });

        setSearchedRows(searchResult);
    };

      return (
        <div className="Companies">
            <Search
                placeholder="Search company..."
                onSearch={handleSearch}
                enterButton
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
                            row.status.charAt(0).toUpperCase() + row.status.slice(1);
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
                                <td>{row.companyName}</td>
                                <td>{row.legalNumber}</td>
                                <td>{row.incorporationLegalNumber}</td>
                                <td>{row.website}</td>
                                <td>
                                    <span className={`label label-${row.status}`}>
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
    
        </div>
        
    );
}

export default Companies;