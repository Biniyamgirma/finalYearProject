const express = require('express');
const router = express.Router();
const db = require("../../database/createDataBase");
const {getAllPoliceStationInfo,updatePoliceStationInfo,deletePoliceOfficer,getAllPoliceOfficer,updatePoliceOfficerInfo,registerPoliceStation,test,addRegion,addCountry,addTown,addZone, registerPoliceOfficerAdmin} = require("../../controllers/rootAdminController/rootAdminController");

// base url /api/police/root
router.route("/addRegion").put(addRegion);
router.route("/addZone").put(addZone);
router.route("/addTown").put(addTown);
router.route("/addPoliceStation").post(registerPoliceStation);
router.route("/registerPoliceOfficer").post(registerPoliceOfficerAdmin)
router.route("/addRootUser").get(test);
router.route("/").get((req,res)=>{
  res.status(200).json({message:"hello from root admin route"});
});
  router.route("/police/station").get(getAllPoliceStationInfo).put(updatePoliceStationInfo).delete(deletePoliceOfficer);
  router.route("/register/police/officer").post(registerPoliceStation); 
module.exports = router;
