const express = require('express');
const router = express.Router();
const db= require("../database/createDataBase.js");
router.route("/").get((req, res) => {

  res.send("hello from police officer route");
}
);
  
module.exports = router;