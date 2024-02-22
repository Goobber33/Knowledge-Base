const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const jwtSecret = process.env.JWT_SECRET;


const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const user = new UserModel({ email, password, username });
        await user.save();

        // Omit the token generation and other logic for this test
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "An error occurred" });
    }
};



// Login User

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password is correct

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during login" });
    }
};

// Reset Password

const resetPassword = async (req, res) => {
    res.send('Password reset functionality not implemented yet.');
};

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
};
