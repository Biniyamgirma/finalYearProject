const express = require('express');
const router = express.Router();

const { addReport,
    getAllReportsSpecificToPost,
    updateReport,
    deleteReport
} = require('../../controllers/reportController/reportController');

// Route for adding a new report
router.route("/addReport").post(addReport);
// Route for getting all reports
// router.route("/getAllReports").get(getAllReports);
// Route for getting a specific report by ID
router.route("/getReport").get(getAllReportsSpecificToPost);
// Route for updating a report
router.route("/updateReport/:reportId").put(updateReport);
// Route for deleting a report
router.route("/deleteReport/:reportId").delete(deleteReport);



module.exports = router;