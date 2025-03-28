const db=require("../database/createDataBase.js");

//@desc register a new police station in the database
//@route POST /api/police/root
//@access point for know public
const registerPoliceStation = (req,res)=>{
    const {policeStationName,policeStationLocation,policeStationStatus}=req.body;
    const ourStatment = db.prepare("INSERT INTO policeStation(policeStationName, policeStationLocation, policeStationStatus) VALUES (?, ?, ?)")
    const result = ourStatment.run(policeStationName,policeStationLocation,policeStationStatus)
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
//@desc register a new police officer in the database  
//@route POST /api/police/registerPoliceOfficer
//@access point for know public
const registerPoliceOfficerAdmin = (req,res)=>{// i need to add the admin id to the police officer table
    const {policeStationId,policeOfficerFname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus}=req.body;
    const ourStatment = db.prepare("INSERT INTO policeOfficer(policeStationId, policeOfficerFname, policeOfficerLname, profilePicture, policeOfficerRoleName, policeOfficerStatus) VALUES (?, ?, ?, ?, ?, ?)")
    const result = ourStatment.run(policeStationId,policeOfficerFname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus)
    res.status(201);
    res.json({"message":"post method","name":`${policeStationName}`
    });
}
//@desc update police officer information in the database
//@route PUT /api/police/updatePoliceOfficer
//@access point for know public
const updatePoliceOfficerInfo = (req,res)=>{
    const {policeStationId,policeOfficerFname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus}=req.body;
    const ourStatment = db.prepare("UPDATE policeOfficer SET policeStationId=?, policeOfficerFname=?, policeOfficerLname=?, profilePicture=?, policeOfficerRoleName=?, policeOfficerStatus=? WHERE policeStationId=?")
    const result = ourStatment.run(policeStationId,policeOfficerFname,policeOfficerLname,profilePicture,policeOfficerRoleName,policeOfficerStatus)
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
