const express = require('express');
const router = express.Router();

router.route("/").get((req, res) => {
    res.send('Police officer contact route');
  });
module.exports = router;