const Role = require("../models/roleModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create New Role --> Admin
exports.createRole = catchAsyncError(async (req, res, next) => {
    const data = await req.body;
    const role = await Role.create(data);
    if (!role) {
        return next(new ErrorHandler("Role not found", 404));
    }
    res.status(201).json({
        success: true,
        role
    })
}
);

exports.getAllRoles = catchAsyncError(async (req, res, next) => {
    const documents = 50
    const page = 1;
    const skip = documents * (page - 1);
    const total = await Role.countDocuments();
    const roles = await Role.find().skip(skip).limit(documents)
    const pages = Math.ceil(total/10)
    if (!roles) {
        return next(new ErrorHandler("Role not found", 404));
    }
    res.status(200).json(
        {
            status: true,
            content: {
                meta: {
                    total,
                    pages,
                    page
                },
                data: roles
            }
        }
    )
});

