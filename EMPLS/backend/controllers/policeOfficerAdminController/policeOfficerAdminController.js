const db=require("../../database/createDataBase");
const bcrypt = require("bcrypt");
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
const viewReportForSpecificPost = (req, res) => {
    const { postId } = req.body;

    // Validate postId is provided
    if (!postId) {
        return res.status(400).json({
            success: false,
            error: "postid is required"
        });
    }

    try {
        // Get all reports for the specified post
        const lookupStatement = db.prepare(`
            SELECT * FROM report 
            WHERE postId = ?
            ORDER BY reportDate DESC
        `);
        const reports = lookupStatement.all(postId);

        // If no reports found
        if (reports.length === 0) {
            return res.json({
                success: true,
                message: "No reports found for this post",
                count: 0,
                data: []
            });
        }

        res.json({
            success: true,
            count: reports.length,
            data: reports
        });

    } catch (error) {
        console.error("Error fetching reports for post:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching reports"
        });
    }
};

// new here
//@desc get all police officer information in the database
// //@route GET /api/police/getAllPoliceOfficer
//@access point for know public
const getAllPoliceOfficerInOurPoliceStation = (req, res) => {
    const { policeStationId } = req.body;

    // Validate policeStationId is provided
    if (!policeStationId) {
        return res.status(400).json({
            success: false,
            error: "policeStationId is required in the request body"
        });
    }

    try {
        // Get all officers for the specified police station
        const statement = db.prepare(`
            SELECT policeOfficerId, policeOfficerFname, policeOfficerMname,policeOfficerLname,policeOfficerRoleName,policeOfficerStatus
            FROM policeOfficer 
            WHERE policeStationId = ?
            ORDER BY firstName, lastName
        `);
        const officers = statement.all(policeStationId);

        // If no officers found
        if (officers.length === 0) {
            return res.json({
                success: true,
                message: "No officers found in this police station",
                count: 0,
                data: []
            });
        }

        res.json({
            success: true,
            count: officers.length,
            data: officers
        });

    } catch (error) {
        console.error("Error fetching police officers:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching officers data"
        });
    }
};
//@desc get all police station information in the database were we added the police station
//@route GET /api/police/getAllPoliceStation
//@access point for know public
const getSpecificPoliceStationInfo = (req, res) => {
    const { id } = req.params;

    // Validate ID parameter
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            success: false,
            error: "Valid police station ID is required in the URL parameters"
        });
    }

    try {
        // Get specific police station with selected columns
        const statement = db.prepare(`
            SELECT 
                nameOfPoliceStation,
                policeStationPhoneNumber,
                secPoliceStationPhoneNumber,
                policeStationLogo,
                townId,
                subCityId,
                rootId
            FROM policeStation 
            WHERE policeStationId = ?
        `);
        
        const station = statement.get(id);

        // If station not found
        if (!station) {
            return res.status(404).json({
                success: false,
                error: "Police station not found with the provided ID"
            });
        }
        const { nameOfPoliceStation, policeStationPhoneNumber, secPoliceStationPhoneNumber, policeStationLogo, townId, subCityId, rootId } = station;
        const sqlTownTable ="SELECT * FROM town WHERE townId = ?";
        const sqlSubCityTable ="SELECT subCityName FROM subCity WHERE subCityId = ?";
        const sqlRootTable ="SELECT username FROM root WHERE rootId = ?";
        // Prepare statements for town, subCity, and root
        const townStatement = db.prepare(sqlTownTable);
        const subCityStatement = db.prepare(sqlSubCityTable);
        const rootStatement = db.prepare(sqlRootTable);
        // Execute the statements to get town, subCity, and root data
        const town = townStatement.get(townId);
        const subCity = subCityStatement.get(subCityId);
        const root = rootStatement.get(rootId);
        // Return the police station data
        res.status(200).json({
            success: true,
            data: station,
            townName: town.townName,
            subCityName: subCity.subCityName,
            rootUsername: root.username,
        });

    } catch (error) {
        console.error(`Error fetching police station with ID ${id}:`, error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching police station data",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
//@ get all posts which the police officer added in the database
//@route GET /api/police/getAllPosts
//@access point for know public
const getAllPosts = (req, res) => {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    // Validate ID parameter
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            success: false,
            error: "Valid police station ID is required"
        });
    }

    try {
        // Get total count with the same filters
        const countStmt = db.prepare(`
            SELECT COUNT(*) as total 
            FROM post 
            WHERE policeStationId = ? AND postStatus = 1
        `);
        const { total } = countStmt.get(id);

        // Get paginated posts
        const statement = db.prepare(`
            SELECT 
                postId,
                townId,
                firstName,
                middleName,
                lastName,
                age,
                lastLocation,
                gender,
                policeOfficerId,
                personStatus,
                imagePath,
                createdAt
            FROM post 
            WHERE policeStationId = ? AND postStatus = 1
            ORDER BY createdAt DESC
            LIMIT ? OFFSET ?
        `);
        
        const posts = statement.all(id, limit, offset);

        res.status(200).json({
            success: true,
            count: posts.length,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: posts
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching posts",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
//@desc get spacific post information in the database
//@route GET /api/police/getPosts:id
//@access point for know public
const getSpecificPost = (req, res) => {
    const { id } = req.params;

    // Validate ID parameter
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            success: false,
            error: "Valid post ID is required"
        });
    }

    try {
        // Get specific post with selected columns
        const statement = db.prepare(`
            SELECT 
                postId,
                townId,
                subCityId,
                postDescription,
                firstName,
                middleName,
                lastName,
                age,
                lastLocation,
                gender,
                policeOfficerId,
                policeStationId,
                postStatus,
                personStatus,
                imageUrl,
                created_at
            FROM posts 
            WHERE postId = ?
        `);
        
        const post = statement.get(id);

        // If post not found
        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found with the provided ID"
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        console.error(`Error fetching post with ID ${id}:`, error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching post",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
//@desc add post to the database
//@route POST /api/police/addPost
//@access point for know public
const addPost = (req, res) => {
    const {
        townId,
        subCityId,
        postDescription,
        firstName,
        middleName,
        lastName,
        age,
        lastLocation,
        gender,
        policeOfficerId,
        policeStationId,
        postStatus,
        personStatus,
        imageUrl} = req.body;
    // Validate required fields
    if (!townId || !firstName || !lastName || !policeStationId ||!postDescription ||!middleName) {
        return res.status(400).json({
            success: false,
            error: "townId, firstName, lastName, and policeStationId are required"
        });
    }
    try {
        const sql=`INSERT INTO post(
        townId,
        subCityId,
        postDescription,
        firstName,
        middleName,
        lastName,
        age,
        lastLocation,
        gender,
        policeOfficerId,
        policeStationId,
        postStatus,
        personStatus,
        imageUrl) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const statement = db.prepare(sql);
        const result = statement.run(townId,subCityId,postDescription,firstName,middleName,lastName,age,lastLocation,gender,policeOfficerId,policeStationId,postStatus,personStatus,imageUrl);
        if (result.changes > 0) {
            return res.status(201).json({
                success: true,
                message: "Post added successfully",
                postId: result.lastInsertRowid
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Failed to add post"
            });
        }
    } catch (error) {
        console.error("Error adding post:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error while adding post",
        });
        
    }
}
const editPost = async (req, res) => {
    const { postId } = req.params;
    const {
        townId,
        subCityId,
        postDescription,
        firstName,
        middleName,
        lastName,
        age,
        lastLocation,
        gender,
        policeOfficerId,
        policeStationId,
        postStatus,
        personStatus,
        imageUrl
    } = req.body;

    // Validate required fields
    if (!postId || isNaN(Number(postId))) {
        return res.status(400).json({
            success: false,
            error: "Valid post ID is required"
        });
    }

    if (!townId || !firstName || !lastName || !policeStationId || !postDescription) {
        return res.status(400).json({
            success: false,
            error: "townId, firstName, lastName, policeStationId, and postDescription are required"
        });
    }

    try {
        // First check if post exists
        const checkStmt = db.prepare("SELECT postId FROM posts WHERE postId = ?");
        const existingPost = checkStmt.get(postId);

        if (!existingPost) {
            return res.status(404).json({
                success: false,
                error: "Post not found with the provided ID"
            });
        }

        // Update the post
        const updateStmt = db.prepare(`
            UPDATE posts SET
                townId = ?,
                subCityId = ?,
                postDescription = ?,
                firstName = ?,
                middleName = ?,
                lastName = ?,
                age = ?,
                lastLocation = ?,
                gender = ?,
                policeOfficerId = ?,
                policeStationId = ?,
                postStatus = ?,
                personStatus = ?,
                imageUrl = ?,
            WHERE postId = ?
        `);

        const result = updateStmt.run(
            townId,
            subCityId,
            postDescription,
            firstName,
            middleName,
            lastName,
            age,
            lastLocation,
            gender,
            policeOfficerId,
            policeStationId,
            postStatus || 1, // Default to active if not provided
            personStatus || 'unknown', // Default status
            imageUrl,
            postId
        );

        if (result.changes === 0) {
            return res.status(500).json({
                success: false,
                error: "Failed to update post"
            });
        }

        // Get the updated post to return
        const getStmt = db.prepare("SELECT * FROM posts WHERE postId = ?");
        const updatedPost = getStmt.get(postId);

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost
        });

    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while updating post",
            
        });
    }
};
const getAllPoliceStationInfo = (req, res) => {
    try {
        const statement = db.prepare("SELECT * FROM policeStation WHERE rootId = ?");
        const rootId = req.user.rootId; // Assuming you have middleware to set req.user
        const stations = statement.run(rootId);

        if (stations.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No police stations found"
            });
        }

        res.status(200).json({
            success: true,
            count: stations.length,
            data: stations
        });

    } catch (error) {
        console.error("Error fetching police stations:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error while fetching police stations",
            
        });
    }
};
module.exports={
    addPost,
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
    viewReportForSpecificPost
}