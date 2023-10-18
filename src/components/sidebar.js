import {React, useState, useEffect } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import m10logo from "../IMAGE/m10logo.png";

import {
    MdAccountTree,
    MdPersonAddAlt,
    MdMenu,
    MdDashboard,
    MdCalendarMonth,
    MdLogout,
    MdLogin,
    MdTaskAlt,
    MdNotifications,
    MdNotificationImportant,
    MdInfo
} from"react-icons/md";


const Sidebar = ({children}) => {

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
})

const [role, setRole] = useState('');
useEffect(() => {
    try {
        var rolee = localStorage.getItem('Role');
        setRole(rolee)
    } catch (error) {
        console.log(error);
    }
});
      
const[isOpen ,setIsOpen] = useState(true);
const toggle = () => setIsOpen (!isOpen);

const pathname = window.location.pathname; // get current path
const sidebarclss = pathname.includes('/index') ? 'nosidebar' : 'sidebar';

 var menuItem = [
            {
                path: "/index",
                name: "Login",
                icon: <MdLogin/>
            }
        ];

switch (role) {
    case '1':
        var menuItem = [
            {
                path: "/home",
                name: "Dashboard",
                icon: <MdDashboard/>
             },
           {
                path: "/goals",
                name: "Goals",
                icon: <MdTaskAlt/>
            },
             {
                path: "/employee",
                name: "Apply for leave",
                icon: <MdCalendarMonth/>
            },
            {
                path: "/allempleavcnt",
                name: "Team leave Info",
                icon: <MdAccountTree/>
            }, {
                path: "/hrpage",
                name: "Leave request",
                icon: <MdNotificationImportant/>
            },

            {
                path: "/leaveinfo",
                name: "Your Leave Info",
                icon: <MdInfo/>
            }, 
            
            {
                path:"/register",
                name: "Add new Employee",
                icon:<MdPersonAddAlt/>
            },
            {
                path: "/logout",
                name: "Logout",
                icon: <MdLogout/>
            }
        ];
        break;


    case '2':
        var menuItem = [
            {
                path: "/home",
                name: "Dashboard",
                icon: <MdDashboard/>
            },
            {
                path: "/goals",
                name: "Goals",
                icon: <MdTaskAlt/>
            }, 
            {
                path: "/employee",
                name: "Apply for leave",
                icon: <MdCalendarMonth/>
            },{
                path: "/empleavcnt",
                name: "Team leave Info",
                icon: <MdAccountTree/>
            },{
                path: "/blpage",
                name: "Leave request",
                icon: <MdNotifications/>
            }, 
            {
                path: "/leaveinfo",
                name: "Your Leave Info",
                icon: <MdNotificationImportant/>
            }, 
            
            {
                path: "/logout",
                name: "Logout",
                icon: <MdLogout/>
            }
        ];
        break;
    case '3':
        var menuItem = [
            {
                path: "/home",
                name: "Dashboard",
                icon: <MdDashboard/>
            },{
                path: "/goals",
                name: "Goals",
                icon: <MdTaskAlt/>
            }, {
                path: "/employee",
                name: "Apply for leave",
                icon: <MdCalendarMonth/>
            },

            {
                path: "/leaveinfo",
                name: "Your Leave Info",
                icon: <MdNotificationImportant/>
            }, 
            
            {
                path: "/logout",
                name: "Logout",
                icon: <MdLogout/>
            }
        ];
       

    }

return (
<div className="container">
    <div style={{ width: isOpen ? "300px" : "50px" }} className={sidebarclss}>
        <div className="top_section">
            {isOpen ? ( <h1 className="logo">
                        <img src={m10logo} alt="Logo" className="logo-image" />
                        </h1>) : null}


                        
        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
              <MdMenu onClick={toggle} />
        </div>
    </div>

    
{
    menuItem.map((item, index) => (<NavLink to={item.path} key={index} className="link" activeclassname="active">
        <div className="icon">{item.icon}</div>
        <div style={ {display: isOpen ? "block" : "none"} } className="link_text">{item.name}</div>
    </NavLink>))
}
    </div>
 <main>{children}</main>

    
</div>


   
)}    

export default Sidebar;
