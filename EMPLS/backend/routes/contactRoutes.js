const express = require('express');
const router = express.Router();
const {getContacts} = require("../controllers/contactController");

// routh for our homepage
//@http request using get method
router.route("/").get(getContacts);
// router.route("/").post(createContact);

// router.route("/:id").put(updateContact).get(getIndivdualContact);
// // we can do multiple operations by connecthig them using dot
// //  if they have the same route
// router.route("/:id").delete(deleteContact);

module.exports = router;