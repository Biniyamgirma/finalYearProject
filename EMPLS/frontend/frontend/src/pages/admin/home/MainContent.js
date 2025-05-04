import React from 'react';
import TabsBootstrap from './subpage'

const MainContent = () => {
  return (  
    <main className="main-content1">
      <header>
        <div className="header-logo1">
          <img src="./image/fedral.png" alt="Logo" />
          <h4>AMHARA POLICE COMMISSION</h4>
        </div>
        <div className="user-info1"><img src="./image/profile.png" alt="" /></div>
      </header>
      <section className="welcome1">
        <p><strong>WELLCOM BINIYAM GIRMA</strong></p>
      </section>
      <section className="police-station-info1">
        <h2>DEBREBRHAN POLICE COMMISION</h2>
      </section>
      <section>
      <TabsBootstrap />
      </section>
      
    </main>
  )
}

export default MainContent;
