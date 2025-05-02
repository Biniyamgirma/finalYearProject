import React from 'react';
import './sidebar.css';
import { useState } from 'react';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  return (
    <div>
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="top-header">
        <div className="logo"><span className="label">APC</span></div>
        <div className="toggle-btn" id="toggleBtn" onClick={toggleSidebar}><img src="./image/icons8-menu-32 (1).png" alt="" /></div>
      </div>
       <div className="sidebar-content">
        <ul className="menu">
          <li><div className="background-for-icon"><img src="./image/icons8-home-96.png" alt="" /></div> <span className="label">Home</span></li>
          <li><div className="background-for-icon"><img src="./image/icons8-report-100.png" alt="" /></div> <span className="label">Report</span></li>
          <li><div className="background-for-icon"><img src="./image/icons8-police-officer-96.png" alt="" /></div> <span className="label">Police Officer</span></li>
          <li><div className="background-for-icon"><img src="./image/icons8-notification-96.png" alt="" /></div> <span className="label">Notification</span> </li>
          <li><div className="background-for-icon"><img src="./image/icons8-police-car-96.png" alt="" /></div> <span className="label">Police Car</span></li>
          <li><div className="background-for-icon"><img src="./image/icons8-website-analytics-96.png" alt="" /></div> <span className="label">Tagged Case</span></li>
          <li><div className="background-for-icon"><img src="./image/icons8-setting-96.png" alt="" /></div> <span className="label">Setting</span></li>
        </ul>
        <div className="footer-sidebar">
          <div className="background-for-ico" id="footer-container"><img src="./image/icons8-logout-rounded-96.png" alt="" /> <span className="label" id="footer-text">Logout</span></div>
          <div className={`logo-container ${isCollapsed ? 'flex-display' : ''}`}>
            <img src="./image/fedral.png" alt="Logo" className="logo-image" />
            <img src="./image/images.png" alt="" />
          </div>
          <div className="title">@2017E.C</div>
        </div>
        

       </div>
     
    </aside>
    </div>
  )
}

export default Sidebar;
