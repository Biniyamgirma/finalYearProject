import React from 'react'
import './PoliceOfficerInfo.css';
const PoliceOfficerInfo = () => {
  return (
    <>
    <h1>Police Officer Directory</h1>

<div class="officer-list">

 
  <div class="officer-card">
    <div class="officer-image">
      <img src="./image/human.jpg" alt="Amanuel Tesfaye" />
    </div>
    <div class="officer-info">
      <p><strong>Officer ID:</strong> PO123456</p>
      <p><strong>Name:</strong> Amanuel Tesfaye</p>
      <p><strong>Rank:</strong> Inspector</p>
      <p><strong>Station:</strong> Addis Ababa Central</p>
      <p><strong>Phone:</strong> +251912345678</p>
    </div>
    <button class="btn-view" onclick="viewDetails('PO123456')">View Details</button>
  </div>

  
  <div class="officer-card">
    <div class="officer-image">
      <img src="./image/human.jpg" alt="Lemlem Mekonnen"/>
    </div>
    <div class="officer-info">
      <p><strong>Officer ID:</strong> PO789012</p>
      <p><strong>Name:</strong> Lemlem Mekonnen</p>
      <p><strong>Rank:</strong> Sergeant</p>
      <p><strong>Station:</strong> Bahir Dar North Station</p>
      <p><strong>Phone:</strong> +251911112233</p>
    </div>
    <button class="btn-view" onclick="viewDetails('PO789012')">View Details</button>
  </div>

</div>
    </>
  )
}

export default PoliceOfficerInfo;
