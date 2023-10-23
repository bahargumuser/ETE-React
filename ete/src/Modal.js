import React, { useState } from "react";
import axios from 'axios';

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue ,setmodalNewpro,modalNewpro}) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      company_name: "",
      company_legal_number: "",
      incorporation_country: "",
      website_url: "",
      company_status: "live",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.company_name && 
      formState.company_legal_number &&
       formState.incorporation_country &&
       formState.website_url
       ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();

    axios
      .post("http://localhost:9000/companies/update", formState)
      .then((res) => {
        console.log(res.status);
        closeModal();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNewCompany = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();

    axios
      .post("http://localhost:9000/companies", formState)
      .then((res) => {
        console.log(res.status);
        closeModal();
        window.location.reload();
        setmodalNewpro(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="company_name">Company Name</label>
            <input name="company_name" onChange={handleChange} value={formState.company_name} />
          </div>
          <div className="form-group">
            <label htmlFor="company_legal_number">Company Legal Number</label>
            <input
              name="company_legal_number"
              onChange={handleChange}
              value={formState.company_legal_number}
            />
          </div>
          <div className="form-group">
            <label htmlFor="incorporation_country">Incorporation Country</label>
            <input
              name="incorporation_country"
              onChange={handleChange}
              value={formState.incorporation_country}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website_url">Website</label>
            <input
              name="website_url"
              onChange={handleChange}
              value={formState.website_url}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company_status">Status</label>
            <select
              name="company_status"
              onChange={handleChange}
              value={formState.company_status}
            >
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={modalNewpro ? handleNewCompany :handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Modal;