import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import mohs10logo from "../IMAGE/mohs10logo.png";
import './login.css';

const Login = ({ onLogin }) => {
  const history = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const submitForm = (e) => {
    e.preventDefault();
    const sendUser = { email: user.email, password: user.password };
    axios.post('http://localhost/lms/src/php/login.php', sendUser)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          window.localStorage.setItem("email", result.data.EmailID);
          window.localStorage.setItem("username", result.data.Full_Name);
          window.localStorage.setItem("BL", result.data.Boxlead);
          window.localStorage.setItem("Role", result.data.Role);
          window.localStorage.setItem("empID", result.data.EMPID);
          window.localStorage.setItem("empD", result.data.EMPD);
          window.localStorage.setItem("empT", result.data.EMPT);
          window.localStorage.setItem("address", result.data.Address);
          window.localStorage.setItem("mobile1", result.data.Mobile_NO);
          
          // Call the onLogin function to update the state in App.js
          onLogin();
          
          // Redirect to the dashboard or home page
          history('/home');
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      });
  }

  return (
    <div className="Login">
      <img src={mohs10logo} alt="Logo" />
      <h3 className="headingg">Access our Leave Management System here!</h3>

      <form onSubmit={submitForm}>
        <input type="text" name="email" placeholder="Enter your email" onChange={handleChange} required />
        <input type="password" id="password" className="input" name="password" placeholder="Enter your password" onChange={handleChange} required />
        
        <input type="submit" id="submitbtn" name="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;



{/* <div className="sub-main" >
  <div className="content-container" >
    <div style={{ marginLeft: "80px" }}>
      <img
        src={mohs10logo}
        alt="logo"
        style={{ width: "200px", height: "80px" }}
      />
    </div>

    <div>
      <div style={{ marginLeft: "150px" }}>
        <h2>Login</h2>
      </div>
      <form onSubmit={submitForm}>
      <label htmlFor="email" style={{ marginLeft: "30px",fontSize: "20px",
  lineHeight: "40px", fontWeight: "normal" }}>
    <img src={email} alt="Email Icon" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
    Email:
    </label>
        <div>
          <input
  type="text"
  name="email"
  placeholder="Enter your email"
  className="name"
  onChange={handleChange}
  required="required"
  value={user.email}
  style={{
    width: "350px",
    marginLeft: "20px",
    width: "350px",
    height: "40px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
    backgroundColor: "#4e44bf74 ",}}
          />
        </div>

        <label htmlFor="password" style={{marginLeft:"30px", position:"absolute",fontSize: "20px",fontWeight: "normal" }}><img src={pass} alt="password Icon" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
    Password:
    </label>
        <div className="second-input">
      
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="name"
            onChange={handleChange}
            required="required"
            value={user.password}
            style={{ width: "350px", marginLeft:"20px", marginTop:"25px",   height: "40px",
            borderRadius: "30px",
           // boxShadow: "inset 0px 0px 25px 0px #888888a6",
            border: "none",
            outline: "none",
            // padding: "0",
            backgroundColor: "#4e44bf74"}}
          />
        </div>
        <div className="login-button">
          <button type="submit" id="submitbtn" name="submit" value="Login" style={{width: "350px",marginLeft:"20px"}}>
            Login
          </button>
        </div>
      </form> 
    </div>
  </div>
</div>*/}

    




// </div>
// )
// }

// export default Login;
