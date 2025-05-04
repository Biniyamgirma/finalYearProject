import React from 'react'
import './Register.css'
const Register = () => {
  return (
   <div className="upper-class">
    <div className="main-content-wraper ">
     
      <div className="form-section">
        <h2>Register New User</h2>
        <form className="form-class-for-register">
          
          <div className="form-row">
            <div className="form-group">
              <label for="fname">First Name</label>
              <input type="text" id="fname" required />
            </div>
            <div className="form-group">
              <label for="mname">Middle Name</label>
              <input type="text" id="mname" />
            </div>
            <div className="form-group">
              <label for="lname">Last Name</label>
              <input type="text" id="lname" required />
            </div>
          </div>
  
          
          <div className="form-row">
            <div className="form-group">
              <label for="age">Age</label>
              <input type="number" id="age" min="1" required />
            </div>
            <div className="form-group">
              <label for="gender">Gender</label>
              <select id="gender" required>
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
  
      
          <div className="form-row">
            <div className="form-group">
              <label for="region">Region</label>
              <select id="region" required>
                <option value="">Select Region</option>
                <option>Amhara</option>
                <option>Oromia</option>
                <option>Tigray</option>
                <option>Sidama</option>
              </select>
            </div>
            <div className="form-group">
              <label for="zone">Zone</label>
              <select id="zone" required>
                <option value="">Select Zone</option>
                <option>S/Shewa</option>
                <option>Semen Wello</option>
                <option>Mirab Gojjam</option>
                <option>Semen Gojjam</option>
              </select>
            </div>
            <div className="form-group">
              <label for="town">Town</label>
              <select id="town" required>
                <option value="">Select Town</option>
                <option>Debre Berhan</option>
                <option>Chacha</option>
                <option>Ancober</option>
                <option>Menze</option>
              </select>
            </div>
            <div className="form-group">
              <label for="subcity">Subcity</label>
              <select id="subcity" >
                <option value="">Select SubCity</option>
                <option>Tebase</option>
                <option>Minilik</option>
                <option>010</option>
              </select>
            </div>
          </div>
  
         
          <div className="form-row">
            <div className="form-group" >
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="+251..." required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label for="nationalId">National Id</label>
              <input type="tel" id="phone" placeholder="National Id..." required />
            </div>
          </div>
          
          <div className="submit-btn">
            <button type="submit">REGISTER</button>
          </div>
        </form>
      </div>
  
      
      <div className="image-section"><img src="../image/amhara.jpg" alt="" /></div>
    </div>
   </div>
 
  )
}

export default Register
