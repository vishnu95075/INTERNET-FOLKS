const express = require('express');
const { createCommunity, getAllCommunities, getAllCommunityMembers, getMyOwnedCommunity } = require('../controllers/communityController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route("/community").post(isAuthenticatedUser,createCommunity);
router.route("/community").get(getAllCommunities);
router.route("/community/:id/members").get(getAllCommunityMembers);
router.route("/community/me/owner").get(isAuthenticatedUser,getMyOwnedCommunity);

module.exports = router