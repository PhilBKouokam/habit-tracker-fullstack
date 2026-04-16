import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

const router = express.Router();

//Register User 
router.post("/register", async (req, res) => {
    try {
        console.log("Registration attempt with body:", req.body);

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ 
            username, 
            email, 
            password: hashedPassword
        });

        await user.save();

        //Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error("Registration Error:", error); 
        res.status(500).json({ 
            message: 'Server error during registration', 
            error: error.message 
        });
    }
});

//Login User
router.post('/login', async (req, res) => {
    try {
        console.log("Login attempt with body:", req.body);

        const { email, password } = req.body;
 
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log("Login successful for user:", user.email);

        res.json({
            message: 'Login successful',
            token,
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email 
            }
        });
    } catch (error) {
        console.error("Login Error Details:", error);
        res.status(500).json({ 
            message: 'Server error during login', 
            error: error.message 
        });
    }
});

export default router