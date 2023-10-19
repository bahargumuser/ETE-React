import React, {useState} from "react";
import Homepage from "./Homepage";
import { useHistory } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    let history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/Homepage");
    }
   

       return (
   
        <div className="auth-form">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="******" id="password" name="password"></input>
        <button type="submit">Login</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
export default Login;
