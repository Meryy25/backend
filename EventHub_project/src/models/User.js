const mongoose = require('mongoose');
const { hashPass, comparePass } = require('../../utils/passwordVerification');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            enum: ["member", "organizer"],
            default: "member",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function() {

    if(!this.isModified('password')) {
        return;
    }

    this.password = await hashPass(this.password);

});

userSchema.methods.comparePass = function(password) {
    return comparePass(password, this.password);
};

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User", userSchema);