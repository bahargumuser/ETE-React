import React, { useState } from "react";

import "./Modal.css";
import axios from "axios";

export const Modalpro = ({
  closeModalOne,
  onSubmit,
  defaultValue,
  setmodalNewpro,
  modalNewpro,companies
}) => {
  const [formStateP, setFormStateP] = useState(
    defaultValue || {
      product_name: "",
      product_category: "",
      product_amount: "",
      product_unit: "",
      companies_id: "",
      product_status: "Live",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formStateP.product_name &&
      formStateP.product_category &&
      formStateP.product_amount &&
      formStateP.product_unit
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formStateP)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormStateP({ ...formStateP, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    onSubmit(formStateP);
    closeModalOne();

    axios
      .post("http://localhost:9000/products/update", formStateP)
      .then((res) => {
        console.log(res.status);
        closeModalOne();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNewProduct = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    onSubmit(formStateP);
    closeModalOne();

    axios
      .post("http://localhost:9000/products", formStateP)
      .then((res) => {
        console.log(res.status);
        closeModalOne();
        window.location.reload();
        setmodalNewpro(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="modalpro-container"
      onClick={(e) => {
        if (e.target.className === "modalpro-container") closeModalOne();
      }}
    >
      <div className="modalpro">
        <form>
          <div className="form-group">
            <label htmlFor="product_name">Product Name</label>
            <input
              name="product_name"
              onChange={handleChange}
              value={formStateP.product_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_category">Product Category</label>
            <input
              name="product_category"
              onChange={handleChange}
              value={formStateP.product_category}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_amount">Product Amount</label>
            <input
              name="product_amount"
              onChange={handleChange}
              value={formStateP.product_amount}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product_unit">Amount Unit</label>
            <input
              name="product_unit"
              onChange={handleChange}
              value={formStateP.product_unit}
            />
          </div>
          {modalNewpro && (
            <div className="form-group">
              <label htmlFor="company_id">Company ID</label>
              <select
                name="company_id"
                onChange={handleChange}
                value={formStateP.company_id}
              >{companies.map((item)=>(
              <option key={item.company_id} value={item.company_id}> {item.company_name}</option>
              ))

              }
                 </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="product_status"
              onChange={handleChange}
              value={formStateP.product_status}
            >
              <option value="Live">Live</option>
              <option value="Draft">Draft</option>
              <option value="Error">Error</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button
            type="submit"
            className="btn"
            onClick={modalNewpro ? handleNewProduct : handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modalpro;
