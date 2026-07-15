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

userSchema.pre("save", async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await hashPass(this.password);

    next();
});

userSchema.methods.comparePass = comparePass;

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model("User", userSchema);