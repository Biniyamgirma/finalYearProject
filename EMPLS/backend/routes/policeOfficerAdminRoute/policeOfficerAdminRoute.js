const express = require('express');
const router = express.Router();
const { addPost,
        editPost,
        getAllPosts,
        getSpecificPost,
        getSpecificPoliceStationInfo,
        getAllPoliceOfficerInOurPoliceStation,
        postAlert,
        alertInTheArea,
        sendMessage,
        addSubPoliceStation,
        updatePoliceOfficerInfo,
        registerNewPoliceOfficer,
        viewReportForSpecificPost} = require('../../controllers/policeOfficerAdminController/policeOfficerAdminController');

// routh for our homepage
//@http request using get method
router.route("/").post(registerNewPoliceOfficer);

module.exports = router;