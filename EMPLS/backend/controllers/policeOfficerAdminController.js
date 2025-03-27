//#### admins can hve the following privilages 1)register new police officer in the area
//2,add police station with in there area
//3,send message to other police station admins
//4,get notifed about the cases or reports in the area
//5,
const express = require('express');
const router = express.Router();
// test
router.route("/").get();
module.exports = router;
//@desc Register a new admin in the database
//@route POST /api/adminside/register
//@access point for know public

// const registerNewPoliceOfficer = (req,res)=>{
//     const{policeOfficerFname, policeOfficerLname, profilePicture, policeOfficerRoleName, policeOfficerStutas,policeStationId}= req.body;
//     const ourStatment = db.prepare("INSERT INTO  policeOfficer(policeOfficerFname, policeOfficerLname, profilePicture, policeOfficerRoleName, policeOfficerStutas, policeStationId) VALUES (?, ?, ?, ?,?,?)")
//     const result = ourStatment.run(policeOfficerFname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStutas,policeStationId)

//     const lookupStatement=db.prepare("SELECT * FROM posts WHERE ROWID = ?")
//     const ourUser = lookupStatement.get(result.lastInsertRowid);
// }
// //@desc Add police Station in the database
// //@route POST /api/adminside/admin/addpolicestation
// //@access point for know public

// const addpolicestation = (req,res)=>{
//     const{nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,policeStationLogo,townId,subCityId,rootId,adminId}= req.body;
//     const ourStatment = db.prepare("INSERT INTO  policeStation(nameOfPoliceStation, policeStationPhoneNumber, secPoliceStationPhoneNumber, policeStationLogo, townId, subCityId, rootId, adminId) VALUES (?, ?, ?, ?,?,?,?,?)")
//     const result = ourStatment.run(nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,policeStationLogo,townId,subCityId,rootId,adminId)

//     const lookupStatement=db.prepare("SELECT * FROM posts WHERE ROWID = ?")
//     const ourUser = lookupStatement.get(result.lastInsertRowid);
// }
// //@desc send message to the user
// //@route Post /api/police/message/sendmessage
// //@access point for know public

// const sendMessage = (req,res)=>{
//     const{sendersId,reciversId,message}=req.body;
//     const ourStatment = db.prepare("INSERT INTO  message(sendersId, reciversId, message) VALUES (?, ?, ?)")
//     const result = ourStatment.run(sendersId,reciversId,message)

//     const lookupStatement=db.prepare("SELECT * FROM posts WHERE ROWID = ?")
//     const ourUser = lookupStatement.get(result.lastInsertRowid);
// }
// //@desc alerts the police officer in the area about possable sight
// //@route POST /api/police/alert/areaalert
// //@access point for know public

// const alertInTheArea = (req,res)=>{// i think i dont need police station id in this method bc what the method dose is that it alerts the town police station if there is a case in the area
//     const{townId}=req.body;
//     const lookupStatement=db.prepare("SELECT * FROM alert WHERE townId = ?")
//     const alerts = lookupStatement.all(townId);

//     res.json({alerts});
// }
// //@desc alert the police station that added the post about possabil sight
// //@route POST /api/police/postpolicestationalert
// //@access point for know public
// const alert =(req,res)=>{
//     const{postPoliceStationId}= req.body;
//     const lookupStatement = db.prepare("SELECT * FROM alert WHERE postPoliceStationId = ? ")
//     const alertsInPost =lookupStatement.all(postPoliceStationId)
//     res.json({alertsInPost})
// }
// //@desc alert the police station that added the post about possabil sight
// //@route POST /api/police/postpolicestationalert
// //@access point for know public
// const viewReportForSpecificPost =(req,res)=>{
//     const{postId}= req.body;
//     const lookupStatement = db.prepare("SELECT * FROM report WHERE postId = ? ")
//     const alertsInPost =lookupStatement.all(postId)
//     res.json({alertsInPost})
// }