import React, { useEffect, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';

function Companies  ({rows, deleteRow, editRow})  {
    const [companiesData, setCompaniesData] = useState([]);

    useEffect(() => {
        axios.get('/companies')
          .then((response) => {
            setCompaniesData(response.data);
          })
          .catch((error) => {
            console.error('Veri çekme hatası:', error);
          });
      }, []);

      return (
        <div className="Companies">
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
                    {rows.map((row, idx) => {
                        const statusText =
                            row.status.charAt(0).toUpperCase() + row.status.slice(1);
    
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
        </div>
    );
}

export default Companies;