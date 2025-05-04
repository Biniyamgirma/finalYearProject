import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostTable from './tabels/Citytable';
function TabsBootstrap() {
  const cityData = [
    {
      postId: '789012',
      fname: 'TADESSE',
      lname: 'KEBEDE',
      mname: 'SOLOMON',
      date: '05:03:2025',
      postState: true,
      personState: 'ACTIVE',
      picture: true,
      icons: ['link'],
    },
  ];
  const zoneData = [
    {
      postId: '789012',
      fname: 'TADESSE',
      lname: 'KEBEDE',
      mname: 'SOLOMON',
      date: '05:03:2025',
      postState: true,
      personState: 'ACTIVE',
      picture: true,
      icons: ['link'],
    },
  ];
  const regionData = [
    {
      postId: '345678',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
  ];
  const ethiopiaData = [
    {
      postId: '23222',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
    {
      postId: '23222',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
    {
      postId: '23222',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
    {
      postId: '23222',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
    {
      postId: '1232',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
    {
      postId: '2322',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
    {
      postId: '2322',
      fname: 'AMARE',
      lname: 'GETACHEW',
      mname: 'MENGISTU',
      date: '04:15:2024',
      postState: false,
      personState: 'CRIMINAL',
      picture: false,
      icons: ['hand'],
    },
  ];
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3 base-color background-for-nav"
      fill
    >
      <Tab eventKey="cityPost" title="City Post" >
        <PostTable title="City Post Table" data={cityData}/>
      </Tab>
      <Tab eventKey="zonePost" title="Zone Post">
      <PostTable title="Zone Post Table" data={zoneData}/>
      </Tab>
      <Tab eventKey="regionPost" title="Region Post">
       <PostTable title="Region Post Table" data={regionData}/>
      </Tab>
      <Tab eventKey="countryPost" title="country Post">
      <PostTable title="Ethiopia Post Table" data={ethiopiaData}/>
        
      </Tab>
    </Tabs>
  );
}

export default TabsBootstrap;