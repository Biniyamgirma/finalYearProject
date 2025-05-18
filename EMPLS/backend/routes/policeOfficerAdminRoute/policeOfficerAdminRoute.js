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
        viewReportForSpecificPost,
        deletePoliceStation
    } = require('../../controllers/policeOfficerAdminController/policeOfficerAdminController');


// routh for our homepage
//@http request using get method
router.route("/register").post(registerNewPoliceOfficer);
router.route("/addPost").post(addPost);
router.route("/editPost").post(editPost);
router.route("/viewReport").post(viewReportForSpecificPost);
router.route("/updatePoliceOfficerInfo").post(updatePoliceOfficerInfo);
router.route("/addPoliceStation").post(addSubPoliceStation);
router.route("/alert").post(postAlert);
router.route("/sendMessage").post(sendMessage);
router.route("/getActivePosts").post(getAllPosts);
router.route("/getSpecificPost/:postId").get(getSpecificPost);
router.route("/getSpecificPoliceStationInfo/:id").get(getSpecificPoliceStationInfo);
router.route("/getAllPoliceOfficerInOurPoliceStation").post(getAllPoliceOfficerInOurPoliceStation);

router.route("/deletePoliceStation").delete(deletePoliceStation);

module.exports = router;