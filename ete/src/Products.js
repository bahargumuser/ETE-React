import React, {useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Pagination } from "antd";
import { Input, Space } from "antd";
const { Search } = Input;

function Products({ rows, deleteRow, editRow }) {
  const [ProductsData, setProductsData] = useState([]);
  const [modalOpenpro, setModalOpenpro] = useState(false);
  const [currentPageOne, setCurrentPageOne] = useState(1);
  const [searchedRowsOne, setSearchedRowsOne] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPageOne(page);
  };

  const itemsPerPage1 = 10;
  const startIndex1 = (currentPageOne - 1) * itemsPerPage1;
  const endIndex1 = startIndex1 + itemsPerPage1;

  const currentItems = searchedRowsOne
    ? searchedRowsOne
    : rows.slice(startIndex1, endIndex1);

  const handleSearch = (value) => {
    const searchResult = rows.filter((row) => {
      return row.product_name.toLowerCase().includes(value.toLowerCase());
    });

    setSearchedRowsOne(searchResult);
    setCurrentPageOne(1);
  };

  return (
    <div className="Companies">
      <Search
        placeholder="Search product..."
        onSearch={handleSearch}
        className="search"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Amount</th>
            <th>Amount Unit</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => {
            const statusText =
              row.product_status.charAt(0).toUpperCase() + row.product_status.slice(1);
            {
              searchedRowsOne
                ? searchedRowsOne.map((row, idx) => {})
                : currentItems.map((row, idx) => {});
            }
            return (
              <tr key={idx}>
                <td>{row.product_name}</td>
                <td>{row.product_category}</td>
                <td>{row.product_amount}</td>
                <td>{row.product_unit}</td>
                <td>{row.company_name}</td>
                <td>
                  <span className={`label-live`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.product_id)}
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
        current={currentPageOne}
        total={rows.length}
        pageSize={itemsPerPage1}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Products;
