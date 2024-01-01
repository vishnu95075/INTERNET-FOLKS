const catchAsyncError = require("../middleware/catchAsyncError");
const Community = require('../models/communityModel');
const Member = require("../models/memberModel");

exports.createCommunity = catchAsyncError(async (req, res, next) => {
    const { name } = req.body;
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-');
    const owner = req.user.id;

    const community = await Community.create({
        name,
        slug,
        owner
    })

    res.status(201).json({
        status: true,
        content: {
            data: {
                community
            }
        }
    })

});

exports.getAllCommunities = catchAsyncError(async (req, res, next) => {
    const documents = 50
    const page = parseInt(req.query.page) || 1;
    const skip = documents * (page - 1);
    const total = await Community.countDocuments();
    const community = await Community
        .find()
        .skip(skip)
        .limit(documents)
        .populate("owner", "name");

    const pages = Math.ceil(total / 10)
    if (!community) {
        return next(new ErrorHandler("Community not found", 404));
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
                data: community
            }
        }
    )
});

exports.getAllCommunityMembers = catchAsyncError(async (req, res, next) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;
    const communityId = req.params.id;
    const total = await Member.countDocuments({ community: communityId });
    const pages = Math.ceil(total / perPage);
    const communityMemberData = await Member.find({ community: communityId })
        .populate({ path: 'user', select: 'id name', })
        .populate({ path: 'role', select: 'id name' })
        .skip((page - 1) * perPage)
        .limit(perPage);

    res.json({
        status: true,
        content: {
            meta: {
                total,
                pages,
                page
            },
            data: communityMemberData
        }
    });

});


exports.getMyOwnedCommunity = catchAsyncError(async (req, res, next) => {

    const documents = 50
    const page = parseInt(req.query.page) || 1;;
    const skip = documents * (page - 1);
    const total = await Community.countDocuments();
    const community = await Community
        .find()
        .skip(skip)
        .limit(documents);

    const pages = Math.ceil(total / 10)
    if (!community) {
        return next(new ErrorHandler("Community not found", 404));
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
                data: community
            }
        }
    )

});


exports.getMyJoinCommunity = catchAsyncError(async (req, res, next) => {
    const documents = 50
    const page = parseInt(req.query.page) || 1;
    const ownerId = req.user.id;
    const skip = documents * (page - 1);
    const total = await Community.countDocuments({owner:ownerId});
    const community = await Community
        .find({owner:ownerId})
        .skip(skip)
        .limit(documents)
        .populate("owner", "name");

    const pages = Math.ceil(total / 10)
    if (!community) {
        return next(new ErrorHandler("Community not found", 404));
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
                data: community
            }
        }
    )

});
