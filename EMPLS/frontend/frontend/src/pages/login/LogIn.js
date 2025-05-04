import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
const LogIn = () => {
  return (
<div className='login'>
 <div className="main-container1">
    <div className="left-image">
        <img src="./image/addis.jpg" alt="" />
    </div>

    <div className="login-section1">
      <div className="login-container">
        <div className="icons-for-header">
          <img src="./image/fedral.png" alt="fedral police picture or logo" />
          <img src="./image/images.png" alt="debrebrhan university logo" />
        </div>
        <h4 className="welcome-message1">WELLCOM TO AMHARA POLICE MISSING PERSON FINDING SYSTEM</h4>
        
        <div className="text-for-header">
          <h2>Login to Your Account</h2>
          
        </div>
        <form>
          <div className="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="Enter username" required />
          </div>

          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" required />
          </div>

          <div className="button-group">
            <button type="submit" >LOGIN</button>
            <button type="button" ><Link to="/register" className="text-not-underline">REGISTER</Link></button>
          </div>
        </form>
      <div className="text-for-header1"><img src="./image/ethiopia.png" alt="" /></div>
      </div>
    </div>
  </div>
</div>
  )
}

export default LogIn;
