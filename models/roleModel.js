const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Role Name"],
        minLength: [2, "Can not less than 2 Character"]
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

roleSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Role", roleSchema);