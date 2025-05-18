const express = require('express');
const router = express.Router();
const { generateToken, comparePassword } = require('../../utils/jwtUtils');
const db = require('../../database/createDataBase');

// Login route
router.post('/login', async (req, res) => {
  console.log("login route");
  console.log(req.body);
  
  
  const { policeOfficerId, password } = req.body;
console.log(policeOfficerId, password);

  try {
    // Find policeOfficer in database
    const policeOfficer = db.prepare('SELECT * FROM policeOfficer WHERE policeOfficerId = ?').get(policeOfficerId);
    
    if (!policeOfficer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await comparePassword(password, policeOfficer.passwordText);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(policeOfficer);

    res.json({
      token,
      user: {
        policeOfficerId: policeOfficer.id,
        role: policeOfficer.role, // or any other user data you want to include
        policeStationId: policeOfficer.policeStationId,  
        townId: policeOfficer.townId,
        firstName: policeOfficer.policeOfficerFname,
        middleName:policeOfficer.policeOfficerMname,
        lastName:policeOfficer.policeOfficerLname,
        policeOfficerRoleName:policeOfficer.policeOfficerRoleName,
        policeOfficerStatus:policeOfficer.policeOfficerStatus,
        policeOfficerPhoneNumber:policeOfficer.policeOfficerPhoneNumber,
        policeOfficerGender:policeOfficer.policeOfficerGender,
        policeOfficerBirthdate:policeOfficer.policeOfficerBirthdate,
        profilePicture:policeOfficer.profilePicture
      }
    });
    console.log(token);
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.post('/auth/token', async (req, res) => {
//   // @desc    Get user data
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   res.status(200).json(req.user);
// };
module.exports = router;