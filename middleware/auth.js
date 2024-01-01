const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Member = require("../models/memberModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
        return next(new ErrorHandler("Error - Not Signed In"), 401);
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decodeData  => ",decodeData)
    req.user = await User.findById(decodeData.id);
    // console.log("req.user", req.user);
    next();
});

exports.authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        const member = await Member.findOne({ user: req.user.id }).populate("role", "name");
        if (!member) {
            return next(new ErrorHandler(`User not found.`, 404));
        }
        const userRole = member.role.name;
        if (!roles.includes(userRole)) {
            return next(new ErrorHandler(`Role: ${userRole} is not allowed to access this resource.`, 403));
        }

        next();
    }
}