import React, {useState} from "react";
import Homepage from "./Homepage";
import { useHistory } from "react-router-dom";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    let history = useHistory();



    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/Homepage");
    }

    return (
  
        <div className="auth-form">
            <h2>Login</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
        <label htmlFor="email">E-mail</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password"></label>
        <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="******" id="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
      </div>

  
  
    )
    }