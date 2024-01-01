const express = require('express');
const { addMember, removeMember } = require('../controllers/memberController');
const { authorizeRoles, isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route("/member").post(addMember);
router.route("/member/:id").delete(isAuthenticatedUser,authorizeRoles("Community Admin","Community Moderator"),removeMember);

module.exports = router