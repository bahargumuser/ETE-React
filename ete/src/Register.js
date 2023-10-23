import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


export const Register = (props) => {
  
    let history = useHistory();

    const [data, setData] = useState({
      email: "",
      password: "",
      fullname:""
    });
    const [error,setError]=useState("");

  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios
        .post("http://localhost:9000/users/register", data)
        .then((response) => {
         
  
        console.log(response.data)
          history.push("/Homepage");
        })
        .catch((error) => {
          setError(error.response.data.message)
  
        });
    };
  

    return (
  
        <div className="auth-form">
            <h2>Login</h2>
            {error&& <h2>{error}</h2>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input name="name" onChange={(e) => setData({...data,fullname:e.target.value})} id="fullname" placeholder="Full Name" />
        <label htmlFor="email">E-mail</label>
        <input  onChange={(e) => setData({...data,email:e.target.value})}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password"></label>
        <input onChange={(e) => setData({...data,password:e.target.value})}type="password" placeholder="******" id="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
      </div>

  
  
    )
    }