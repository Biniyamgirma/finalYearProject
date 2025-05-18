const express = require('express');
const router = express.Router();
const db = require("../../database/createDataBase");
const authMiddleware = require('../../middleware/authMiddleware');

router.route("/").get((req,res)=>{
    res.status(200).json({message:"hello from root admin route"});
});
router.route("/").post(authMiddleware([1,2,3]),(req,res)=>{
    res.status(200).json({message:"hello from root admin route your tooken is valid and you are authenticated and just finised your work"});
});

module.exports = router;