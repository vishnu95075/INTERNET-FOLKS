const express = require('express');
const { createCommunity, getAllCommunities, getAllCommunityMembers, getMyOwnedCommunity, getMyJoinCommunity } = require('../controllers/communityController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route("/community").post(isAuthenticatedUser,createCommunity);
router.route("/community").get(getAllCommunities);
router.route("/community/:id/members").get(isAuthenticatedUser,getAllCommunityMembers);
router.route("/community/me/owner").get(isAuthenticatedUser,getMyOwnedCommunity);
router.route("/community/me/member").get(isAuthenticatedUser,getMyJoinCommunity);

module.exports = router