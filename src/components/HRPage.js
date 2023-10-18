import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from "react"
import emailjs from '@emailjs/browser';

const HR = () => {
let navigate = useNavigate();

useEffect(() => {
    try {
        var auth = localStorage.getItem('email');
        if (auth === null) {
            navigate('./index');
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
            navigate('/');
       }else{
        setRole(rolee)
       }
    } catch (error) {
        console.log(error);
    }
},[]);

const [dataq, setData] = useState('');
useEffect(() => {
    axios.get('http://localhost/lms/src/php/hr.php')
    .then((result) =>{
    setData(result.data)
    })
    .catch(e => console.log(e));
});
const data = Array.from(dataq);

const approve = (id,mail,nm) =>{
const sendData = {
      state:"Approved",
      id:id,
      email:mail,
      ename:nm
    }
    
    // emailjs.send('service_hqck0de', 'template_9ks3val', sendData,'VcjT0m_JGqkL0olCE')
    // .then((result) => {
    //     console.log(result.text);
    // }, (error) => {
    //     console.log(error.text);
    // });

    axios.post('http://localhost/lms/src/php/approve.php',sendData)
    .then((result) => {
      if(result.data['data']['Leave'] ==   'Approved'){
      alert("Leave Approved");
    }else{
      alert("Something went wrong");
    }})
};

const reject = (id,mail,nm) =>{
    const sendData = {
      state:"Rejected",
      id:id,
      email:mail,
      ename:nm
    }

    // emailjs.send('service_hqck0de', 'template_9ks3val', sendData,'VcjT0m_JGqkL0olCE')
    // .then((result) => {
    //     console.log(result.text);
    // }, (error) => {
    //     console.log(error.text);
    // });

    axios.post('http://localhost/lms/src/php/reject.php',sendData)
    .then((result) => {
      console.log(result);
      if(result.data['data']['Leave'] ==   'Rejected'){
        alert("Leave Rejected");
      }else{
        alert("Something went wrong");
      }
  })
};



return (
 <div className="table-container">
    <h2 style={{marginRight:"100px"}}>Applied Leaves</h2>
    {data.length > 0 ? (  <table className="responsive-table" style={{width:"90%"}}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>TypeOfLeave</th>
                <th>LengthOfLeave</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Reason</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {data.map((leave) => (
            <tr key={leave.ID}>
                <td>{leave.FullName}</td>
                <td>{leave.EMPID}</td>
                <td>{leave.TypeOfLeave}</td>
                <td>{leave.LengthOfLeave}</td>
                <td>{leave.StartDate}</td>
                <td>{leave.EndDate}</td>
                <td>{leave.Message}</td>
                <td>
                    <button onClick={() => approve(leave.ID,leave.mail,leave.FullName)} className="nav-link">Approve</button>
                    <button onClick={() => reject(leave.ID,leave.mail,leave.FullName)} className="nav-link">Reject</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>) : <h3>No Pending Leave Requests</h3> }
</div>
)} 
export default HR;