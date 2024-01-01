const mongoose = require('mongoose');
const catchAsyncError = require("../middleware/catchAsyncError");
const Member = require("../models/memberModel");

exports.addMember = catchAsyncError(async (req, res, next) => {
    const { user, community, role } = req.body;

    const userId = new mongoose.Types.ObjectId(user);
    const communityId = new mongoose.Types.ObjectId(community);
    const roleId = new mongoose.Types.ObjectId(role);

    const member = await Member.create({
        user: userId,
        community: communityId,
        role: roleId
    });

    res.status(201).json({
        member
    });
});

exports.removeMember = catchAsyncError(async (req, res, next) => {
    const member = await Member.findById(req.params.id);

    if (!member) {
        return next(new ErrorHandler(`Member not found.`), 404);
    }

    await Member.findByIdAndRemove(req.params.id);

    res.status(200).json({
        status: true
    })
});