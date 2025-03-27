const express = require('express');
const router = express.Router();
const {getContacts} = require("../controllers/contactController");

// routh for our homepage
//@http request using get method
router.route("/").get((req, res) => {
    res.send('Police contact route');
  });
module.exports = router;