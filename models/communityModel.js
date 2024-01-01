const mongoose = require("mongoose");
const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Community Name"],
        minLength: [2, "Can not less than 2 Character"]
    },
    slug: {
        type: String,
        unique: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

communitySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Community", communitySchema);