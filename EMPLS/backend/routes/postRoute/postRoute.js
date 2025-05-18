const express = require('express');
const router = express.Router();
const {addPost,
    getAllPostInCity,
    getAllPostInZone,
    getAllPostInRegion,
    addPostToZoneTable,
    addPostToRegionTable,
    deletePost,
    getSpecificPost,
    editPost
} =require('../../controllers/post/postController');


router.route("/addpost").post(addPost);
router.route("/city").get(getAllPostInCity);
router.route("/zone").get(getAllPostInZone);
router.route("/region").get(getAllPostInRegion);

router.route("/addPostToZone").post(addPostToZoneTable);
router.route("/addPostToRegion").post(addPostToRegionTable);
router.route("/getSpecificPost/:postId").get(getSpecificPost);
router.route("/editPost").put(editPost);
router.route("/deletePost/:postId").delete(deletePost);

module.exports = router;
