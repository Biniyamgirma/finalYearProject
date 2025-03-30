const db=require("../database/createDataBase.js");

//@desc register a new police station in the database
//@route POST /api/police/root
//@access point for know public
const registerPoliceStation = (req,res)=>{
    const {nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,policeStationLogo,townId,subCityId,rootId,adminId}=req.body;
    const ourStatment = db.prepare("INSERT INTO policeStation(nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,PoliceStationLogo,townId,subCityId,rootId,adminId) VALUES (?, ?, ?,?,?,?,?,?)")
    const result = ourStatment.run(nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,policeStationLogo,townId,subCityId,rootId,adminId);
    if(!result){
        res.status(400);
        throw new Error("there is a problem with the data you are trying to insert");;
    }
    res.status(201);
    res.json({"message":"data inserted successfully","name":`${nameOfPoliceStation}`});
}
//@desc register a new police officer in the database  
//@route POST /api/police/registerPoliceOfficer
//@access point for know public
const registerPoliceOfficerAdmin = (req,res)=>{// i need to add the admin id to the police officer table
    const {policeStationId,policeOfficerFname,policeOfficerMname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus,policeOfficerPhoneNumber,password}=req.body;
    // hash the password using bcrypt
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    // check if the password is hashed or not
    // console.log(passwordHash)
    // check if the password is hashed or not
    // console.log(bcrypt.compareSync(password, passwordHash))
    // check if the password is hashed or not

    const ourStatment = db.prepare("INSERT INTO policeOfficer(policeOfficerFname,policeOfficerMname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus,policeOfficerPhoneNumber,policeOfficerGender,policeOfficerBirthdate,passwordText,policeStationId) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?)")
    const result = ourStatment.run(policeOfficerFname,policeOfficerMname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus,policeOfficerPhoneNumber,policeOfficerGender,policeOfficerBirthdate,passwordHash ,policeStationId);
    if(!result){    
        res.status(400);
        throw new Error("there is a problem with the data you are trying to insert");;
    }
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
//@desc update police officer information in the database
//@route PUT /api/police/updatePoliceOfficer:id
//@access point for know public
const updatePoliceOfficerInfo = (req,res)=>{
    const {policeStationId,policeOfficerFname,policeOfficerMname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus,policeOfficerPhoneNumber,policeOfficerBirthdate,policeOfficerGender,password}=req.body;
    // hash the password using bcrypt
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    // check if the password is hashed or not
    // console.log(passwordHash)
    // check if the password is hashed or not
    // console.log(bcrypt.compareSync(password, passwordHash))
    const ourStatment = db.prepare("UPDATE policeOfficer SET policeStationId=?, policeOfficerFname=?,policeOfficerMname=?, policeOfficerLname=?, profilePicture=?, policeOfficerRoleName=?, policeOfficerStatus=?,policeOfficerPhoneNumber=?,passwordText=?,policeOfficerBirthdate=?,policeOfficerGender=? WHERE policeStationId=?")
    const result = ourStatment.run(policeStationId,policeOfficerFname,policeOfficerMname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus,policeOfficerPhoneNumber,passwordHash,policeOfficerBirthdate,policeOfficerGender)
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
//@desc update police officer information in the database
//@route DELETE /api/police/updatePoliceOfficer
//@access point for know public
const deletePoliceOfficer = (req,res)=>{
    const {policeOfficerId}=req.body;
    const ourStatment = db.prepare("DELETE * FROM policeOfficer  WHERE policeOfficerId=?")
    const result = ourStatment.run(policeOfficerId)
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
//@desc get all police officer admin information in the database
//@route GET /api/police/getAllPoliceOfficer
//@access point for know public
const getAllPoliceOfficer = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM policeOfficer")
    const result = ourStatment.all()
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
//@desc get all police station information in the database
//@route GET /api/police/getAllPoliceStation
//@access point for know public
const getAllPoliceStationInfo = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM policeStation")
    const result = ourStatment.all()
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
//@desc update policestation information in the database
//@route PUT /api/police/:id updatePoliceStation
//@access point for know public
const updatePoliceStationInfo = (req,res)=>{
    const {policeStationId,policeStationName,policeStationLocation,policeStationStatus}=req.body;
    const ourStatment = db.prepare("UPDATE policeStation SET policeStationId=?, policeStationName=?, policeStationLocation=?, policeStationStatus=? WHERE policeStationId=?")
    const result = ourStatment.run(policeStationId,policeStationName,policeStationLocation,policeStationStatus)
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
module.exports={
    registerPoliceStation,
    registerPoliceOfficerAdmin,
    updatePoliceOfficerInfo,
    deletePoliceOfficer,
    getAllPoliceOfficer,
    getAllPoliceStationInfo,
    updatePoliceStationInfo
}