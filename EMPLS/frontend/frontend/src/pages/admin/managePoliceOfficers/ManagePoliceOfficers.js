import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Sidebar from '../../../components/sidebar/Sidebar';
import PoliceOfficerInfo from '../../../components/policeOfficer/PoliceOfficerInfo';
import TabsBootstrap from '../home/subpage';
const ManagePoliceOfficers = () => {
  return (
    <div className="container1">
    <Sidebar />
    <main className="main-content1">
      <header>
        <div className="header-logo1">
          <img src="./image/fedral.png" alt="Logo" />
          <h4>AMHARA POLICE COMMISSION</h4>
        </div>
        <div className="user-info1"><img src="./image/profile.png" alt="" /></div>
      </header>
      <section>
      <TabsBootstrap />
      </section>
      
    </main>
    </div>
  )
}

export default ManagePoliceOfficers;
