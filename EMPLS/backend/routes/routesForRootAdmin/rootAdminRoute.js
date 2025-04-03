const express = require('express');
const router = express.Router();
const db = require("../../database/createDataBase");
const {getAllPoliceStationInfo,updatePoliceStationInfo,deletePoliceOfficer,getAllPoliceOfficer,updatePoliceOfficerInfo,registerPoliceStation,test,addRegion,addCountry,addTown,addZone, registerPoliceOfficerAdmin} = require("../../controllers/rootAdminController/rootAdminController");

// base url /api/police/root

//post methods
router.route("/register-police-officer").post(registerPoliceOfficerAdmin);
router.route("/add-police-station").post(registerPoliceStation);
//get route
router.route("/get-all-police-officer").get(getAllPoliceOfficer);
router.route("/get-all-police-station").get(getAllPoliceStationInfo);
router.route("/add-root-user").get(test);
//put route
router.route("/add-region").put(addRegion);
router.route("/add-zone").put(addZone);
router.route("/add-town").put(addTown);
router.route("/police-officers/:id").put(updatePoliceOfficerInfo);
//delete route
router.route("/delete-officer").delete(deletePoliceOfficer);
router.route("/").get((req,res)=>{
  res.status(200).json({message:"hello from root admin route"});
});
  router.route("/police/station").get(getAllPoliceStationInfo).put(updatePoliceStationInfo).delete(deletePoliceOfficer);
  router.route("/register/police/officer").post(registerPoliceStation); 
module.exports = router;
