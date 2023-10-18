import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './db.css';

function Home() {
  const [tbl1, setTbl1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const namee = localStorage.getItem('username');
    axios.get('http://localhost/lms/src/php/LeaveStatus.php', {
      params: { fullname: namee },
    })
      .then((res) => {
        setTbl1(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display an error message if the request fails
  }

  return (
    <div className="container1" style={{textAlign:"center"}}>
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
        {tbl1.length > 0 ? (
          <tbody>
            {tbl1.map((leave) => (
              <tr key={leave.ID}>
                <td>{leave.TypeOfLeave}</td>
                <td>{leave.LengthOfLeave}</td>
                <td>{leave.StartDate}</td>
                <td>{leave.State}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

export default Home;
