import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {

    const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
    try {
        var auth = localStorage.getItem('email');
        if (auth === null) {
            history('./index');
        }
    } catch (error) {
        console.log(error);
    }
})

const [role, setRole] = useState('');
useEffect(() => {
    try {
        var rolee = localStorage.getItem('Role');
        if (rolee !== "1" || rolee === null) {
            history('/');
       }else{
        setRole(rolee)
       }
    } catch (error) {
        console.log(error);
    }
});

const [data,setData]=useState({
    fullname:"",
    email:"",
    password:"",
    role:"",
    boxlead:"",
    mobileno:"",
    address:"",
    empID:""
})

const handleChange = (e)=>{ setData({...data, [e.target.name]: e.target.value}) }

const submitForm = (e) => {
    e.preventDefault();
const sendData = {
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    role: data.role,
    boxlead: data.boxlead,
    mobileno: data.mobileno,
    address: data.address,
    employeeiD: data.empID,
    empD:data.dsgn
}
axios.post('http://localhost/lms/src/php/register.php',sendData)
.then((result) => {
    console.log(result.data);
   //alert(result.data);
if(result.data['data']['Status'] ===   'valid'){
    alert("User Added");
}else if(result.data['data']['Status'] ===   'Userexists'){
    alert("User already exixts");
}else{
    alert("Something went wrong");
}
})

}

const updateForm = (e) => {
    e.preventDefault();
const sendData = {
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    role: data.role,
    boxlead: data.boxlead,
    mobileno: data.mobileno,
    address: data.address,
    employeeiD: data.empID,
    empD:data.dsgn
}

axios.post('http://localhost/lms/src/php/update_user.php',sendData)
.then((result) => {
    if (result.data['data']['Status'] === 'valid') {
        alert("User Updated");
    }else {
    alert("Something went wrong");
    }
                })
}

    return(
      <div>
    <div className="heading">
        <h2>Add New User</h2>
    </div>
    <form className="leave-form">
    <label>User Role</label>
<select
    name="role"
    className="form-control"
    onChange={handleChange}
    value={data.role}
    required="required"
>
    <option value="" disabled>Select Role</option>
    <option value="3">Employee</option>
    <option value="2">Manager</option>
    <option value="1">HR</option>
    {/* <option value="4">CEO</option> */}
</select>

        <label>Employee ID</label>
<input
  type="text"
  name="empID"
  className="form-control"
  onChange={handleChange}
  value={data.empID}
  required="required"
  minLength="8"
/>
{data.empID.length < 8 && (
  <p className="error-message" >Employee ID must be at least 8 characters long.</p>
)}

<label>Full Name</label>
<input
  type="text"
  name="fullname"
  className="form-control"
  onChange={handleChange}
  value={data.fullname}
  pattern="^[A-Za-z ]+$"
  required="required"
/>
{!/^[A-Za-z ]+$/.test(data.fullname) && (
  <p className="error-message">Name should not contain numbers.</p>
)}

       <label>Designation</label>
        <input
            type="text"
            name="dsgn"
            className="form-control"
            onChange={handleChange}
            value={data.dsgn}
            required="required"/>
        <label>Manager</label>
        <input
            type="text"
            name="boxlead"
            placeholder="Write your manager name(You are coming under which manager)"
            className="form-control"
            onChange={handleChange}
            value={data.boxlead}
            required="required"/>
        <label>Email ID</label>
<input
  type="email"
  name="email"
  placeholder="Mohs10 Email ID"
  className="form-control"
  onChange={handleChange}
  value={data.email}
  pattern="[a-z0-9._%+-]+@mohs10\.io"
  required="required"
/>
{!/^[a-z0-9._%+-]+@mohs10\.io$/.test(data.email) && (
  <p className="error-message">Please enter a valid Mohs10 Email ID.</p>
)}

<label>Password</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="form-control"
            onChange={handleChange}
            value={data.password}
            pattern=".{8,}"
            required="required"
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        {data.password.length < 8 && (
          <p className="error-message">Password should be at least 8 characters long.</p>
        )}



<label>Mobile Number</label>
<input
  type="tel"
  name="mobileno"
  className="form-control"
  onChange={handleChange}
  value={data.mobileno}
  pattern="[0-9]{10}"
  required="required"
/>
{!/^[0-9]{10}$/.test(data.mobileno) && (
  <p className="error-message">Mobile Number should be exactly 10 digits and contain only numbers.</p>
)}

        <label>Address</label>
        <input
            type="text"
            name="address"
            className="form-control"
            onChange={handleChange}
            value={data.address}
            required="required"/>
        <button type="submit" onClick={submitForm}>Add User</button>
        <button type="submit" onClick={updateForm}>Update User Details</button>
    </form>
</div>
    )
}

export default Register;