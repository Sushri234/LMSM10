import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from "react"

const BL = () => {
let navigate = useNavigate();

useEffect(() => {
    try {
        var auth = localStorage.getItem('email');
        if (auth === null) {
            navigate('/index');
        }
    } catch (error) {
        console.log(error);
    }
});

const [role, setRole] = useState('');
useEffect(() => {
  try {
    var rolee = localStorage.getItem('Role');
    if (rolee == "3" || rolee === null) {
      navigate('/');
    }else{
      setRole(rolee);
    }
    }catch (error) {
    console.log(error);
  }}
);

const [dataq, setData] = useState('');
useEffect(() => {
    var namee = localStorage.getItem('username');
    axios.get('http://localhost/lms/src/php/bl.php',{params:{fullname:namee}})
    .then((result) =>{
    setData(result.data)})
    .catch(e => console.log(e));}
);
const data = Array.from(dataq);

const approve = (id) =>{
const sendData = {
    state: "Approved",
    id: id
}
axios
    .post('http://localhost/lms/src/php/Bapprove.php', sendData)
    .then((result) => {
        console.log(result);
        if (result.data['data']['Leave'] === 'Approved') {
            alert("Leave Request Sent For HR Approval");
        } else {
            alert("Something went wrong");
        }
    })
};

const reject = (id) =>{
const sendData = {
    state: "Rejected",
    id: id
}
axios
    .post('http://localhost/lms/src/php/Breject.php', sendData)
    .then((result) => {
        console.log(result);
        if (result.data['data']['Leave'] === 'Rejected') {
            alert("Leave Rejected");
        } else {
            alert("Something went wrong");
        }
    })
};

  return (
 <div className="table-container">
    <h2>Applied Leaves</h2>
    {data.length > 0? (<table className="responsive-table">
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
                    <button onClick={() => approve(leave.ID)} className="nav-link">Approve</button>
                    <button onClick={() => reject(leave.ID)} className="nav-link">Reject</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>):<h3>No Pending Leave Requests</h3>}
</div>
)}

export default BL;
