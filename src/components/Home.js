import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import './db.css';


const Home = () => {
let history = useNavigate();

useEffect(() => {
    try {
        var auth = localStorage.getItem('email');
        if (auth === null) {
        history('./index');
        }
    } catch (error) {
        console.log(error);
    }
},[])

const pdetails = {
    email: window.localStorage.getItem("email"),
    username:window.localStorage.getItem('username'),
    BL:window.localStorage.getItem("BL"),
    Role: window.localStorage.getItem("Role"),
    empID: window.localStorage.getItem("empID"),
    empD: window.localStorage.getItem("empD"),
    empT: window.localStorage.getItem("empT"),
    Address: window.localStorage.getItem("address"),
    mobile1: window.localStorage.getItem("mobile1")
}

useEffect(()=>{
    const userName =document.getElementById("name");
    var namee = localStorage.getItem('username');
    userName.innerHTML = "<h2>Welcome! "+namee+"</h2>";
},[])

const [tbl, setTbl] = useState('');
useEffect(() => {
    var namee = localStorage.getItem('username');
    axios.get('http://localhost/lms/src/php/empcnt.php', { params:{fullname:namee}})
        .then((result) => {
        setTbl(result.data)
        })
        .catch(e => console.log(e));
},[]);
const lcnt = Array.from(tbl);
console.log(lcnt.length)
const [tbl1, setTbl1] = useState('');
useEffect(() => {
    var namee = localStorage.getItem('username');
    axios.get('http://localhost/lms/src/php/LeaveStatus.php',{params:{fullname:namee}})
    .then((res) =>{
    setTbl1(res.data)
    })
   .catch(e => console.log(e));
},[]);

const fArray = Array.from(tbl1);

return(
<div>
    <div className="dashboard-container">
        <div className="column" >
         {pdetails.empID? ( 
            <div className="card" style={{overflowY: "auto",scrollbarWidth:"none"}}>
                <h2>Your Profile</h2>
                <p>Employee ID : {pdetails.empID}</p>
                <br></br>
                <p>Name : {pdetails.username}</p>
                <br></br>
                <p>Employee Designation : {pdetails.empD}</p>
                <br></br>
                {/* <p>Employee Tenure : {pdetails.empT - currentda}</p>
                <br></br> */}
                <p>Mobile No : {pdetails.mobile1}</p>
                <br></br>
                {/*
                <p>employee alt ph no</p>
                */}
                <p>Address : {pdetails.Address}</p>
                <br></br>
            </div>
            ) : null }
        </div>
        <div className="column">
            <div className="card" style={{overflowY: "auto",scrollbarWidth:"none"}}>
                <h2>HR Policies</h2>
                <p>
                    <a
                    href="https://mohs10.io/wp-content/uploads/2023/06/Leave-Policy-and-Work-Life-Balance-1.pdf"
                    target="_blank">Leave Policies</a>
                </p><br></br>
                <p>
                    <a
                    href="https://mohs10.io/wp-content/uploads/2023/06/Holiday-Calendar-2023-Mohs10.pdf"
                    target="_blank">Holiday Calendar</a>
                </p>
            </div>
        </div>
        <div className="column">
            <div className="card" style={{overflowY: "auto",scrollbarWidth:"none"}}>
                <h2>Message from CEO</h2>
                <p>◈ Our employees are the most valuable assets of our organization!</p><br></br>
                <p>◈ We believe in “विद्वान सर्वत्र पूज्यते (vidvaan sarvatr poojyate)” which means “intelligent people are worshipped everywhere”!</p><br></br>
                <p>◈ If “learning new technologies and growing continuously” is your passion then MOHS10 is absolutely your next place to work!</p>
            </div>
        </div>
    </div>

<div className="dashboard-container">
    <div id="name"></div>
    <table className="responsive-table" style={{width:"90%"}}>
            <thead>
                <tr>
                <th>Type of Leave</th>
                <th># Leaves Availed</th>
                <th># Leaves Available</th>
                </tr>
            </thead> 
{ (lcnt.length==0) ? (
            <tbody> 
                    <tr>
                        <td>PL</td>
                        <td>0</td>
                        <td>18</td>
                    </tr>
                    <tr>
                        <td>SL</td>
                        <td>0</td>
                        <td>15</td>
                    </tr>
            </tbody>
        ):null}
{(lcnt.length == 1) ? (
            <tbody> 
            {lcnt.map((cnt)=>(
                <React.Fragment key={cnt.ID}>
                <tr>
                    <td >{cnt.TypeOfLeave}</td>
                    <td >{cnt.noofLeaves}</td>
                    <td >{cnt.TypeOfLeave=='PL' ? (18-cnt.noofLeaves):(15-cnt.noofLeaves)}</td>
                </tr>
                {(cnt.TypeOfLeave=='PL') ? (
                    <tr>
                    <td >SL</td>
                    <td >0</td>
                    <td >{15}</td>
                  </tr> ) :
                  (<tr>
                    <td >PL</td>
                    <td >0</td>
                    <td >{18}</td>
                  </tr>)}
                </React.Fragment>
                ))}
            </tbody>
        ):null}
{(lcnt.length == 2) ? (
            <tbody> 
                {lcnt.map((cnt)=>(
                    <React.Fragment >
                    <tr key={cnt.ID}>
                        <td >{cnt.TypeOfLeave}</td>
                        <td >{cnt.noofLeaves}</td>
                        <td >{cnt.TypeOfLeave=='PL' ? (18-cnt.noofLeaves):(15-cnt.noofLeaves)}</td>
                    </tr>
                    </React.Fragment>
                    ))}
            </tbody>
        ):null}
    </table>   
</div>

    {/* <div className="dashboard-container">
        <h2>Your Leaves Info</h2>
        <table className="responsive-table">
            <thead>
                <tr>
                    <th>TypeOfLeave</th>
                    <th>LengthOfLeave</th>
                    <th>StartDate</th>
                    <th>Status</th>
                </tr>
            </thead>
            {fArray.length > 0 ? (
            <tbody>
                {fArray.map((leave) => (
                <tr key={leave.ID}>
                    <td>{leave.TypeOfLeave}</td>
                    <td>{leave.LengthOfLeave}</td>
                    <td>{leave.StartDate}</td>
                    <td>{leave.State}</td>
                </tr>
                ))}
            </tbody>
                ) : null }
        </table>

    </div> */}
</div>
)}

export default Home;
