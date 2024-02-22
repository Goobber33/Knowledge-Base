const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        sparse: true, // Allows for null values but ensures uniqueness among non-null values
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    username: {
        type: String,
        unique: true,
        sparse: true, // This will allow multiple documents without a username and avoid duplicate key error for null values
        trim: true,
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
