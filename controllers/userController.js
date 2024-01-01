const ErrorHandler = require("../utils/errorhandler");
const InputErrorHandler = require("../utils/inputErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


exports.signUpUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!email) {
        return next(new InputErrorHandler("email","INVALID_INPUT","Please provide a valid email address.", 400))
    }
    if (!password) {
        return next(new InputErrorHandler("password","INVALID_INPUT","Please provide a valid password.", 400))
    }

    const exitUser = await User.findOne({ email });

    if(exitUser){
        return next(new InputErrorHandler("email","RESOURCE_EXISTS","User with this email address already exists.", 400))
    }
    
    const user = await User.create({
        name, email, password
    });

    sendToken(user, 200, res);
});

exports.signInUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return next(new InputErrorHandler("email","INVALID_INPUT","Please provide a valid email address.", 400))
    }
    if (!password) {
        return next(new InputErrorHandler("password","INVALID_INPUT","Please provide a valid password.", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new InputErrorHandler("password","INVALID_INPUT","The credentials you provided are invalid.", 400))
    }

    const isPasswordMatch = await user.comparePassword(password);
   
    if (!isPasswordMatch) {
        return next(new InputErrorHandler("password","INVALID_INPUT","The credentials you provided are invalid.", 400))
    }

    sendToken(user, 200, res);
});

exports.logOut = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: false
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        status: true,
        content: {
            data: {
                user
            }
        }
    })
});
