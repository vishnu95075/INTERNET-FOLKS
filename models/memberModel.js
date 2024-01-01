const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        require: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    community: {
        type: mongoose.Schema.ObjectId,
        ref: "Community",
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

memberSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Member", memberSchema);