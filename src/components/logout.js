
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  let navigate = useNavigate();

  const logout = () => {
    // Perform logout-related tasks, e.g., clearing user data from local storage
    localStorage.removeItem('email');
    localStorage.clear();

    // Call the onLogout function to update the state in App.js
    onLogout();

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='logoutcss'>
      <h2>Do you really want to Logout</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;





// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
 
//   let  navigate = useNavigate();
  
//   const logout = () => {
//     localStorage.removeItem('email');
//     localStorage.clear();
//     navigate('/index');
//   };

//   return (
//     <div className='logoutcss'>
//       <h2>Do you really want to Logout</h2>
//       <button onClick={logout}>Logout</button> 
//     </div>
//   );
// };

// export default Logout;


