const express = require('express');
const router = express.Router();

router.route("/").get((req, res) => {
    res.send('regular user contact route');
  });
module.exports = router;