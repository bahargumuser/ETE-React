import React, { useState } from 'react';

import './Modal.css';

export const Modalpro = ({ closeModalOne, onSubmit, defaultValue }) => {
  const [formStateP, setFormStateP] = useState(
    defaultValue || {
      productName: '',
      productCategory: '',
      productAmount: '',
      amountUnit: '',
      companyName: '',
      status: 'live',
    }
  );
  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (
      formStateP.productName &&
      formStateP.productCategory &&
      formStateP.productAmount &&
      formStateP.amountUnit
    ) {
      setErrors('');
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formStateP)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(', '));
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
  };

  return (
    <div
      className="modalpro-container"
      onClick={(e) => {
        if (e.target.className === 'modalpro-container') closeModalOne();
      }}
    >
      <div className="modalpro">
        <form>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              name="productName"
              onChange={handleChange}
              value={formStateP.productName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Product Category</label>
            <input
              name="productCategory"
              onChange={handleChange}
              value={formStateP.productCategory}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productAmount">Product Amount</label>
            <input
              name="productAmount"
              onChange={handleChange}
              value={formStateP.productAmount}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amountUnit">Amount Unit</label>
            <input
              name="amountUnit"
              onChange={handleChange}
              value={formStateP.amountUnit}
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              name="companyName"
              onChange={handleChange}
              value={formStateP.companyName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formStateP.status}
            >
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modalpro;
