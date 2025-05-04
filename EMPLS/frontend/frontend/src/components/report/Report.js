import React from 'react';
import './Report.css'; // Assuming you have a CSS file for styling
import {Link} from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
const Report = () => {
  return (
    <>
     <Sidebar />
    <div className="main-content1">
      <h1 className="report-header">Reports for Post ID: 123</h1>
  <div className="report-container">
    <div className="report-card">
      <div className="report-title">Reported by: user123</div>
      <div className="report-meta">Town: Addis Ababa | Subcity: Bole</div>
      <div className="report-desc">There is a suspicious activity happening near the bus station.</div>
      <a href="#" className="report-link">View Post</a>
    </div>

    <div className="report-card police">
      <div className="report-title">Reported by: DEBRE BERHAN POLICE STATION</div>
      <div className="report-meta">Town: Debre Berhan | Subcity: Kebele 03</div>
      <div className="report-desc">We have dispatched a patrol car to investigate recent theft incidents.</div>
      <a href="#" className="report-link">View Post</a>
    </div>

    <div className="report-card police">
      <div className="report-title">Reported by: GONDAR POLICE STATION</div>
      <div className="report-meta">Town: Gondar | Subcity: Arada</div>
      <div className="report-desc">Routine checkpoint set up at main intersection.</div>
      <a href="#" className="report-link">View Post</a>
    </div>
  </div>
    </div>
    </>
     
  )
}

export default Report;
