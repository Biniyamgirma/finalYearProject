import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  return (
      <aside className={`sidebar1 ${isCollapsed ? 'collapsed1' : ''}`} id="sidebar1">
      <div className="top-header1">
        <div className="logo1"><span className="label1">APC</span></div>
        <div className="toggle-btn1" id="toggleBtn1" onClick={toggleSidebar}><img src="./image/icons8-menu-32 (1).png" alt="" /></div>
      </div>
       <div className="sidebar-content1">
        <ul className="menu1">
        <Link to="/" className="no-underline"><li><div className="background-for-icon1"><img src="./image/icons8-home-96.png" alt="" /></div> <span className="label1 ">Home</span></li></Link> 
         <Link to="/report" className="no-underline"><li><div className="background-for-icon1"><img src="./image/icons8-report-100.png" alt="" /></div> <span className="label1 ">Report</span></li>
         <Link to="/policeOfficer" className="no-underline"><li><div className="background-for-icon1"><img src="./image/icons8-police-officer-96.png" alt="" /></div> <span className="label1">Police Officer</span></li></Link></Link>
         <Link to="/notification" className="no-underline"><li><div className="background-for-icon1"><img src="./image/icons8-notification-96.png" alt="" /></div> <span className="label1">Notification</span> </li></Link>
         <Link to="/policeCar" className="no-underline"><li><div className="background-for-icon1"><img src="./image/icons8-police-car-96.png" alt="" /></div> <span className="label1">Police Car</span></li></Link>
         <Link to="/analaytics" className="no-underline"><li><div className="background-for-icon1"><img src="./image/icons8-website-analytics-96.png" alt="" /></div> <span className="label1">Tagged Case</span></li></Link>
         <Link to="/setting" className="no-underline"><li><div className="background-for-icon1"><img src="./image/icons8-setting-96.png" alt="" /></div> <span className="label1">Setting</span></li></Link>
        </ul>
        <div className="footer-sidebar1">
         <Link to="/login" ><div className="background-for-ico1" id="footer-container1"><img src="./image/icons8-logout-rounded-96.png" alt="" /> <span className="label1" id="footer-text1">Logout</span></div></Link>
          <div className={`logo-container1 ${isCollapsed ? 'flex-display1' : ''}`}>
            <img src="./image/fedral.png" alt="Logo" className="logo-image1" />
            <img src="./image/images.png" alt="" />
          </div>
          <div className="title1">@2017</div>
        </div>
        

       </div>
     
    </aside>
  )
}

export default Sidebar;
