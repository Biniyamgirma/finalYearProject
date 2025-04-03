//#### admins can hve the following privilages 1)register new police officer in the area
//2,add police station with in there area
//3,send message to other police station admins
//4,get notifed about the cases or reports in the area
//5,
const db=require("../database/createDataBase.js");

// @desc Register a new admin in the database
// @route POST 
// @access point for know public

// @desc    Register a new police officer admin
// @route   POST /api/adminside/register
// @access  Private (should be protected with admin auth middleware)

const registerNewPoliceOfficer = async (req, res) => {
    const {
        policeOfficerFname,
        policeOfficerMname,
        policeOfficerLname,
        profilePicture,
        policeOfficerRoleName,
        policeOfficerStatus,
        policeOfficerPhoneNumber,
        passwordText,
        policeOfficerGender,
        policeOfficerBirthdate,
        role,
        policeStationId
    } = req.body;

    // Input validation
    if (!policeOfficerFname || !policeOfficerLname || !policeStationId) {
        return res.status(400).json({
            success: false,
            message: "First name, last name, and police station ID are required"
        });
    }

    try {
        // Check if police station exists
        const stationCheck = db.prepare("SELECT policeStationId FROM policeStation WHERE policeStationId = ?");
        const stationExists = stationCheck.get(policeStationId);
        
        if (!stationExists) {
            return res.status(404).json({
                success: false,
                message: "Police station not found"
            });
        }
            // Hash the password
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(passwordText, saltRounds);
    
            // Insert into database
            const statement = db.prepare(`
                INSERT INTO policeOfficer (
                    policeOfficerFname,
                    policeOfficerMname,
                    policeOfficerLname,
                    profilePicture,
                    policeOfficerRoleName,
                    policeOfficerStatus,
                    policeOfficerPhoneNumber,
                    policeOfficerGender,
                    policeOfficerBirthdate,
                    passwordText,
                    role,
                    policeStationId
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);
    
            const result = statement.run(
                policeOfficerFname,
                policeOfficerMname,
                policeOfficerLname,
                profilePicture,
                policeOfficerRoleName,
                policeOfficerStatus,
                policeOfficerPhoneNumber,
                policeOfficerGender,
                policeOfficerBirthdate,
                passwordHash,
                role,
                policeStationId
            );
    
            if (result.changes > 0) {
                return res.status(201).json({
                    message: "Police officer registered successfully",
                    name:policeOfficerFname
                });
            } else {
                return res.status(500).json({ message: "Failed to insert data" });
            }
        } catch (error) {
            console.error("Database error:", error);
            return res.status(500).json({ message: "Error in data insertion", error: error.message });
        }
};
//@update police officer information in the database only with our police station id
//@route PUT /api/police/updatePoliceOfficer/:id
//@access point for know public
const updatePoliceOfficerInfo = async (req, res) => {
    const {
        policeStationId,
        policeOfficerFname,
        policeOfficerMname,
        policeOfficerLname,
        profilePicture,
        policeOfficerRoleName,
        policeOfficerStatus,
        policeOfficerPhoneNumber,
        policeOfficerBirthdate,
        policeOfficerGender,
        passwordText
    } = req.body;
    const { id } = req.params; // Extract policeOfficerId from request parameters
    console.log(id);
    console.log(req.body);
    try {
        // Hash the password (use either hash or hashSync, not both)
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(passwordText, saltRounds);

        const statement = db.prepare(`UPDATE policeOfficer SET 
            policeOfficerFname = ?,
            policeOfficerMname = ?,
            policeOfficerLname = ?,
            profilePicture = ?, 
            policeOfficerRoleName = ?,
            policeOfficerStatus = ?,
            policeOfficerPhoneNumber = ?,
            passwordText = ?,
            policeOfficerBirthdate = ?,
            policeOfficerGender = ?,
            policeStationId = ?
            WHERE policeOfficerId = ?`);

        const result = statement.run(
            policeOfficerFname,
            policeOfficerMname,
            policeOfficerLname,
            profilePicture,
            policeOfficerRoleName,
            policeOfficerStatus,
            policeOfficerPhoneNumber,
            passwordHash,
            policeOfficerBirthdate,
            policeOfficerGender,
            policeStationId,
            id  // This should be last to match the WHERE clause
        );

        if (result.changes > 0) {
            res.status(200).json({
                message: "Police officer updated successfully",
                name: policeOfficerFname
            });
        } else {
            res.status(404).json({
                message: "No police officer found with that ID"
            });
        }
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            message: "Error updating police officer",
            error: error.message
        });
    }
};
// //@desc Add sub police Station in the database
// //@route POST 
// //@access point for know public

const addSubPoliceStation = (req,res)=>{
    try {
        const {nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,policeStationLogo,townId,subCityId,adminId}=req.body;
    const ourStatment = db.prepare("INSERT INTO policeStation(nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,PoliceStationLogo,townId,subCityId,rootId) VALUES (?, ?, ?,?,?,?,?)")
    const result = ourStatment.run(nameOfPoliceStation,policeStationPhoneNumber,secPoliceStationPhoneNumber,policeStationLogo,townId,subCityId,adminId);
    res.status(201);
    res.json({"message":"data inserted successfully"});
} catch (error) {
       console.log(error);
       res.status(400);
       res.json({"message":"error in data insertion"});
    }
    console.log(req.body)
    
}

// //@desc send message to the user
// //@route Post /api/police/message/sendmessage
// //@access point for know public

const sendMessage = (req, res) => {
    try {
        const { sendersId, reciversId, message } = req.body;
        
        // Validate input
        if (!sendersId || !reciversId || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Insert message
        const insertStatement = db.prepare("INSERT INTO message (sendersId, reciversId, message) VALUES (?, ?, ?)");
        const result = insertStatement.run(sendersId, reciversId, message);

        // Verify insertion
        if (result.changes === 0) {
            return res.status(500).json({ error: "Failed to send message" });
        }

        // Get the inserted message (fixed to query messages table instead of posts)
        const lookupStatement = db.prepare("SELECT * FROM message WHERE id = ?");///this thing may cause an error so i should be very cearfull
        const sentMessage = lookupStatement.get(result.lastInsertRowid);

        if (!sentMessage) {
            return res.status(500).json({ error: "Message sent but could not be retrieved" });
        }

        // Return success response with the sent message
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: sentMessage
        });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// //@desc alerts the police officer in the area about possable sight
// //@route POST /api/police/alert/areaalert
// //@access point for know public

const alertInTheArea = (req, res) => {
    const { policeStationId } = req.body;
    
    // Validate townId is provided
    if (!policeStationId) {
        return res.status(400).json({
            error: "You Must Be a Member of amhara police force is required"
        });
    }

    try {
        // Get all alerts for the specified town
        const lookupStatement = db.prepare(`
            SELECT * FROM alert 
            WHERE localPoliceStationId = ? 
            ORDER BY createdAt DESC
        `);
        const alerts = lookupStatement.all(townId);

        // If no alerts found, return a message
        if (alerts.length === 0) {
            return res.json({
                message: "No active alerts in this area",
                count: 0,
                data: []
            });
        }

        res.json({
            count: alerts.length,
            data: alerts
        });

    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({
            error: "Internal server error while fetching alerts"
        });
    }
};

const postAlert =(req,res)=>{
    const{policeStationId}= req.body;
    if(!policeStationId){
        return res.status(400).json({
            error:"You Must Be a Member of amhara police force is required"
        });
    }
    try {
        const lookupStatement = db.prepare("SELECT * FROM alert WHERE postPoliceStationId = ? ")
        const alertsInPost =lookupStatement.all(policeStationId)
        if(alertsInPost.length === 0){
            return res.json({
                message:"No active alerts in the posts you added",
                count:0,
                data:[]
            });
        }
        res.json({
            count: alertsInPost.length,
            data: alertsInPost
            });
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({
            error: "Internal server error while fetching alerts"
        });
        
    }
   
}
// //@desc alert the police station that added the post about possabil sight
// //@route POST /api/police/postpolicestationalert
// //@access point for know public
const viewReportForSpecificPost =(req,res)=>{
    const{postId}= req.body;
    const lookupStatement = db.prepare("SELECT * FROM report WHERE postId = ? ")
    const alertsInPost =lookupStatement.all(postId)
    res.json({alertsInPost})
}

// new here
//@desc get all police officer information in the database
// //@route GET /api/police/getAllPoliceOfficer
//@access point for know public
// const getAllPoliceOfficer = (req,res)=>{
//     const ourStatment = db.prepare("SELECT * FROM policeOfficer WHERE policeStationId=?")
//     const result = ourStatment.run()
//     res.status(201);
//     res.json({"message":"post method","name":`${result}`
//     });
// }
//@desc get all police station information in the database were we added the police station
//@route GET /api/police/getAllPoliceStation
//@access point for know public
const getAllPoliceStationInfo = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM policeStation")
    const result = ourStatment.all()
    res.status(201);
    res.json({"message":"post method","name":`${result}`
    });
}
//@ get all posts which the police officer added in the database
//@route GET /api/police/getAllPosts
//@access point for know public
const getAllPosts = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM posts")
    const result = ourStatment.all()
    res.status(201);
    res.json({"message":"post method","name":`${result}`
    });
}
//@desc get spacific post information in the database
//@route GET /api/police/getPosts:id
//@access point for know public
const getPost = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM posts WHERE postId = ?")
    const result = ourStatment.get(req.params.id)
    res.status(201);
    res.json({"message":"post method","name":`${result}`
    });
}
//@desc get alart specific to police station information in the database
//@route GET /api/police/getAlart:id
//@access point for know public
const getAlart = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM alert WHERE postPoliceStationId = ?")
    const result = ourStatment.get(req.params.id)
    res.status(201);
    res.json({"message":"post method","name":`${result}`
    });
}
//@desc get all message information in the database
//@route GET /api/police/getMessage:id
//@access point for know public
const getMessage = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM message WHERE reciversId = ?")
    const result = ourStatment.get(req.params.id)
    res.status(201);
    res.json({"message":"post method","name":`${result}`
    });
}
//@desc get indivibual message information in the database
//@route GET /api/police/getMessage:id
//@access point for know public
const getIndivibualMessage = (req,res)=>{
    const ourStatment = db.prepare("SELECT * FROM message WHERE messageId = ?")
    const result = ourStatment.get(req.params.id)
    res.status(201);
    res.json({"message":"post method","name":`${result}`
    });
}
module.exports={
    registerNewPoliceOfficer,
    getAllPoliceOfficer,
    getAllPoliceStationInfo,
    getAllPosts,
    getPost,
    getAlart,
    getMessage,
    getIndivibualMessage
}