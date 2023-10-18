import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import React from "react"

const Empcnt = () => {
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
    axios.get('http://localhost/lms/src/php/blleaves.php',{params:{fullname:namee}})
    .then((result) =>{
    setData(result.data)})
    .catch(e => console.log(e));}
);
const data = Array.from(dataq);

return (
 <div className="table-container">
    <h2>Availed leaves info </h2>
    {data.length > 0? (<table className="responsive-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type of Leave</th>
                <th>No.of Leaves</th>
            </tr>
        </thead>
        <tbody>
            {data.map((leave) => (
            <tr key={leave.ID}>
                <td>{leave.FullName}</td>
                <td>{leave.TypeOfLeave}</td>
                <td>{leave.noofLeaves}</td>
            </tr>
            ))}
        </tbody>
    </table>):<h3>No One Availed Leaves </h3>}
</div>
)}

export default Empcnt;
