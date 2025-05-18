const db = require("../../database/createDataBase");
const authMiddleware = require('../../middleware/authMiddleware');
const rbacMiddleware = require('../../middleware/rbacMiddleware');
 
const addPost = async (req, res) => {

    try {
        const { townId,
            subCityId,
            postDescription,
            firstName,
            lastName,
            age,
            lastLocation,
            gender,
            policeOfficerId,
            policeStationId,postStatus,personStatus,imagePath} = req.body;
        // const userId = req.user.userId; // Assuming you have userId in the request object
    
        // Insert the new post into the database
        const result = db.prepare(`
        INSERT INTO posts (
        townId, subCityId, postDescription, 
        firstName, lastName, age, lastLocation,
        gender,policeOfficerId,policeStationId,
        postStatus,personStatus,imagePath)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(townId, subCityId, postDescription, firstName, 
            lastName, age, lastLocation,gender ,policeOfficerId,
            policeStationId,postStatus,personStatus,imagePath); 
    
        res.status(201).json({ message: "Post created successfully", postId: result.lastInsertRowid });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    }
const getAllPostInCity = async (req, res) => {
    try {
        const { townId, } = req.body;
        // const userId = req.user.userId; // Assuming you have userId in the request object
    
        // Fetch all posts from the database
        const posts = db.prepare(`
            SELECT * FROM post WHERE townId = ?
        `).all(townId);
    
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getAllPostInZone = async (req, res) => {
    try {
        const { zoneId } = req.body;
        // const userId = req.user.userId; // Assuming you have userId in the request object
    
        // Fetch all posts from the database
        const posts = db.prepare(`
            SELECT p.*
            FROM post p
            JOIN zone z ON p.post_id = z.post_id
            WHERE z.zone_id = ?
        `).all(zoneId);
    
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getAllPostInRegion = async (req, res) => {
    try {
        const { regionId } = req.body;
        // const userId = req.user.userId; // Assuming you have userId in the request object
    
        // Fetch all posts from the database
        const posts = db.prepare(`
           SELECT p.*
            FROM post p
            JOIN region r ON p.post_id = r.postId
            WHERE r.regionId = ?
        `).all(regionId);
    
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const addPostToZoneTable = async (req, res) => {
    try {
        const { zoneId, postId } = req.body;
        // const userId = req.user.userId; // Assuming you have userId in the request object
    
        // Insert the new post into the database
        const result = db.prepare(`
            INSERT INTO zonePost (zoneId, postId)
            VALUES (?, ?)
        `).run(zoneId, postId); 
    
        res.status(201).json({ message: "Post added to zone successfully", postId: result.lastInsertRowid });
    } catch (error) {
        console.error("Error adding post to zone:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const addPostToRegionTable = async (req, res) => {
    try {
        const { regionId, postId } = req.body;
        // const userId = req.user.userId; // Assuming you have userId in the request object
    
        // Insert the new post into the database
        const result = db.prepare(`
            INSERT INTO regionPost (regionId, postId)
            VALUES (?, ?)
        `).run(regionId, postId); 
    
        res.status(201).json({ message: "Post added to region successfully", postId: result.lastInsertRowid });
    } catch (error) {
        console.error("Error adding post to region:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const editPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { townId,
            subCityId,
            postDescription,
            firstName,
            middleName,
            lastName,
            age,
            lastLocation,
            gender,
            policeOfficerId,
            policeStationId,postStatus,personStatus,imagePath} = req.body;
        // const userId = req.user.userId; // Assuming you have userId in the request object
        const result = db.prepare(`
            UPDATE post
            SET townId = ?, subCityId = ?, postDescription = ?, 
            firstName = ?, middleName = ?, lastName = ?, age = ?, 
            lastLocation =? , gender = ?, policeOfficerId = ?,
            policeStationId = ?, postStatus = ?, personStatus = ?, imagePath = ?
            WHERE postId = ? ;
        `).run(townId, subCityId, postDescription, firstName,
            middleName, lastName, age, lastLocation,gender ,policeOfficerId,
            policeStationId,postStatus,personStatus,imagePath,postId);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post updated successfully" });
    }
    catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        // const userId = req.user.userId; // Assuming you have userId in the request object
    
        // Delete the post from the database

        const result = db.prepare(`
            DELETE FROM regionPost WHERE postId = ?
        `).run(postId);
        const result2 = db.prepare(`
            DELETE FROM zonePost WHERE postId = ?
        `).run(postId);
        const result3 = db.prepare(`
            DELETE FROM zonePost WHERE postId = ?
        `).run(postId);
    
        // 
    
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

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


module.exports = {
    addPost,
    getAllPostInCity,
    getAllPostInZone,
    getAllPostInRegion,
    addPostToZoneTable,
    addPostToRegionTable,
    editPost,
    deletePost,
    getSpecificPost
}

// const getAllPostInCountry = async (req, res) => {
//     try {
//         // const { regionId } = req.body;
//         // const userId = req.user.userId; // Assuming you have userId in the request object
    
//         // Fetch all posts from the database
//         const posts = db.prepare(`
//             SELECT * FROM post 
//         `).all();
    
//         res.status(200).json({ posts });
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }