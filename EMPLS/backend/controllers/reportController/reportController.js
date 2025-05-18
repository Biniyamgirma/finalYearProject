const db = require("../../database/createDataBase");

const addReport = async (req, res) => {
    try {
        const { postId,townId,subCityId,reportDescription,userId,PoliceStationId } = req.body;

        // Insert the new report into the database
        const result = db.prepare(`
            INSERT INTO report (postId, townId,subCityId,reportDescription,userId,PoliceStationId)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(postId, townId, subCityId, reportDescription, userId, PoliceStationId);
        // Check if the insert was successful

        res.status(201).json({ message: "Report created successfully", reportId: result.lastInsertRowid });
    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getAllReportsSpecificToPost = async (req, res) => {
    try {
        const { postId } = req.body;
        // Fetch all reports from the database
        const reports = db.prepare(`
            SELECT * FROM report WHERE postId = ?
        `).all(postId);

        res.status(200).json({ reports });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const updateReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { reportDescription } = req.body;

        // Update the report in the database
        const result = db.prepare(`
            UPDATE report
            SET reportDescription = ?
            WHERE reportId = ?
        `).run(reportDescription, reportId);

        // Check if the update was successful
        if (result.changes === 0) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report updated successfully" });
    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.body;

        // Delete the report from the database
        const result = db.prepare(`
            DELETE FROM report WHERE reportId = ?
        `).run(reportId);

        // Check if the delete was successful
        if (result.changes === 0) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    addReport,
    getAllReportsSpecificToPost,
    updateReport,
    deleteReport
}