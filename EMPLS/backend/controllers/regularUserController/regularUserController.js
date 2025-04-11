const db= require("../../database/createDataBase");
const bcrypt = require("bcrypt");

const viewPostsInArea =  (req,res)=> {
    const { townId } = req.body;
    db.query("SELECT * FROM post WHERE area = ?", [area], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json(results);
    });

}
const viewPostDetails = (req, res) => {
    const { postId } = req.body;
    db.query("SELECT * FROM post WHERE id = ?", [postId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json(results[0]);
    });
}
const viewUserProfile = (req, res) => {
    const { userId } = req.body;
    db.query("SELECT * FROM normalUser WHERE id = ?", [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(results[0]);
    });
}
const reportPost = (req, res) => {
    const { postId, reportDescription, userId, subCityId,townId,policeStationId } = req.body;
    db.query("INSERT INTO report (postId, townId, subCityId, reportDescription, userId, policeStationId) VALUES (?, ?, ?,?,?,?)", [postId, townId, subCityId,reportDescription,userId,policeStationId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(201).json({ message: "Report submitted successfully" });
    });
}

module.exports = {
    viewPostsInArea,
    viewPostDetails,
    viewUserProfile,
    reportPost
};