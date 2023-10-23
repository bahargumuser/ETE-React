import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
 


export const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error,setError]=useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:9000/users/login", data)
      .then((response) => {
       
        console.log("Login successful:", response.data);
        localStorage.setItem("token",response.data.token);
        let user= jwt_decode(response.data.token);
        const userJSON = JSON.stringify(user);
      
        localStorage.setItem("user",userJSON)
        history.push("/Homepage");
      })
      .catch((error) => {
        setError(error.response.data.message)

      });
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <h2>{error}</h2>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="password"
          placeholder="******"
          id="password"
          name="password"
        ></input>
        <button type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("register")}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};
export default Login;
