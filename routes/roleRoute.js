const express = require("express");
const { createRole, getAllRoles} = require("../controllers/roleController");

const router = express.Router();
router.route("/role").get(getAllRoles);
router.route("/role").post(createRole);
module.exports = router;