const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const{ token} =req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("Error - Not Signed In"),401);
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY);
    // console.log("decodeData  => ",decodeData)
    req.user=await User.findById(decodeData.id);
    // console.log("req.user", req.user);
    next();
});

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
        return next(
            new ErrorHandler(`Role : ${req.user.role} is not allow to access this resource `,403
            ));
        }
        next();
    }
}