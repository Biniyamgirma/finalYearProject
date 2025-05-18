const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
  
  return jwt.sign(
    {
      policeOfficerId: user.id,
      role: user.role, // or any other user data you want to include
      policeStationId: user.policeStationId,  
      townId: user.townId
    },
    process.env.JWTSECRET,
    { expiresIn: '2d' } // Token expires in 2 days
  );
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWTSECRET);
};

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password with hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword
};