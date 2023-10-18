import './App.css';
import React, { useState } from 'react';
import Empcnt from './components/empleavcnt';
import AllEmpcnt from './components/allleavecnt'; 
import Home from './components/Home';
import Goals from './components/goals';
import Login from './components';
import Register from './components/Register';
import Emp from './components/Emp';
import HR from './components/HRPage';
// import MDPage from './components/MDPage';
import BL from './components/boxlead';
import Logout from './components/logout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LeaveInfo from './components/LeaveInfo';
// import CEO from './components/CEO';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setLoggedIn(true);
  }

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <Router>
      <div className='container'>
        {loggedIn ? (
          // Display the dashboard when logged in
          <>
            <Sidebar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
              <Route path="/register" element={<Register/>}/>
        <Route path="/employee" element={<Emp/>}/>
        <Route path="/hrpage" element={<HR/>}/>
        <Route path="/blpage" element={<BL/>}/>
        <Route path="/empleavcnt" element={<Empcnt/>}/>
        <Route path="/allempleavcnt" element={<AllEmpcnt/>}/>
        <Route path="/goals" element={<Goals/>}/>
        <Route path="/leaveinfo" element={<LeaveInfo/>}/>
        {/* <Route path="/Ceo" element={< CEO/>}/> */}


            </Routes>
          </>
        ) : (
          // Display the login page when not logged in
          <Routes>
            <Route
              path="/"
              element={<Login onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
