const express = require('express');
const router = express.Router();


router.route("/").get((req, res) => {
    res.send('root user test contact route');
  });
module.exports = router;
