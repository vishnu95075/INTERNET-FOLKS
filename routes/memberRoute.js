const express = require('express');
const { addMember, removeMember } = require('../controllers/memberController');

const router = express.Router();

router.route("/member").post(addMember);
router.route("/member/:id").delete(removeMember);

module.exports = router