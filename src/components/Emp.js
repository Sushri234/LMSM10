import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { differenceInDays } from 'date-fns';  // Import date-fns function
import './apply.css';

// Define the calculateWorkingDays function
function calculateWorkingDays(startDate, endDate) {
  let workingDays = 0;
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workingDays;
}

const Emp = () => {
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
    })
    
    const [data,setData]=useState({ role:"",fullname:"", boxlead:"", typeofleave:"", lengthofleave:"", leavestartdate:"", leaveenddate:"", message:"" })
    
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      }
    
    const calculateLeaveLength = () => {
        if (data.leavestartdate && data.leaveenddate) {
          const startDate = new Date(data.leavestartdate);
          const endDate = new Date(data.leaveenddate);
          const leaveLength = calculateWorkingDays(startDate, endDate); // Use the calculateWorkingDays function
          setData({ ...data, lengthofleave: leaveLength });
        }
    };
    
    const submitForm = (e) => {
        e.preventDefault();
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate = new Date(document.getElementById("endDate").value);
        var currentDate = new Date();
        if (endDate >= startDate && startDate >= currentDate) {
            const sendData = {
                eid: localStorage.getItem('empID'),
                role: localStorage.getItem('Role'),
                fullname: localStorage.getItem('username'),
                boxlead: localStorage.getItem('BL'),
                typeofleave: data.typeofleave,
                lengthofleave: data.lengthofleave,
                leavestartdate: data.leavestartdate,
                leaveenddate: data.leaveenddate,
                message: data.message,
                maill: localStorage.getItem('email')
            }
    
            // emailjs.send('service_hqck0de', 'template_1it39v8',
            // sendData,'VcjT0m_JGqkL0olCE') .then((result) => {
            // console.log(result.text); }, (error) => {     console.log(error.text); });
    
            axios.post('http://localhost/lms/src/php/emp.php', sendData)
                .then((result) => {
                    if (result.data['data']['State'] == 'Pending') {
                        alert("Your leave is under review");
                        history('/');
                    } else {
                        alert("Something Went Wrong");
                    }
                })
        } else {
            alert("End date cannot be earlier than start date");
            document.getElementById("endDate").value = "";
            return false;
        }
    }

  return (
    <div>
      <div className="heading" ><h2>Apply For Leave</h2></div>
      <form onSubmit={submitForm} className="leave-form">
        <label>Type Of Leave</label>
        <select
          type="text"
          name="typeofleave"
          placeholder="PL/SL/CL/ML/PAL"
          className="form-control"
          onChange={handleChange}
          value={data.typeofleave}
          required="required"
          style={{width:"99%"}}
        >
        <option value="" disabled>Select Leave</option>
            <option value="PL">Privilege Leave</option>
            <option value="SL">Sick Leave</option>
            <option value="CL">Casual Leave</option>
            <option value="ML">Maternity Leave</option>
            <option value="PAL">Paternity Leave</option>
        </select>

        <label>Leave Start Date</label>
        <input
          id="startDate"
          type="date"
          name="leavestartdate"
          className="form-control"
          onChange={handleChange}
          value={data.leavestartdate}
          required="required"
          onBlur={calculateLeaveLength}
        />

        <label>Leave End Date</label>
        <input
          id="endDate"
          type="date"
          name="leaveenddate"
          className="form-control"
          onChange={handleChange}
          value={data.leaveenddate}
          required="required"
          onBlur={calculateLeaveLength}
        />

        <label>Length Of Leave (Excluding Weekends)</label>
        <input
          type="number"
          min="1"
          max="18"
          name="lengthofleave"
          placeholder="No. of Days"
          className="form-control"
          onChange={handleChange}
          value={data.lengthofleave}
          required="required"
          style={{ width: "98%" }}
          readOnly={true}
        />

        <label>Message</label>
        <textarea
          type="text"
          name="message"
          className="form-control"
          onChange={handleChange}
          value={data.message}
          required="required"
          style={{style:"97%"}}
        />
        <button type="submit" name="submit" value="Apply For Leave">Apply For Leave</button>
      </form>
    </div>
  );
}

export default Emp;
