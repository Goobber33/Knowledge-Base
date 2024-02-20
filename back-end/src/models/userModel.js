import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        avatar : String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ['read', 'write', 'maintain', 'admin'],
    required: true 
        },
        subscriptions: [String],
        groups: [String],
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message' 
        }],
        collections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection' 
        }],
        verified: {
            type: Boolean
        },
        viewHistory: [String], 
        activity_privacy: {
          type: Boolean,
          default: false
        },
        profile_privacy: {
          type: Boolean,
          default: false
        },
        language: {
          type: String,
          required: true
        }
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;