//import the express
const express = require("express");

// import the jsonwebtoken for generating the secure tokens
const jwt = require("jsonwebtoken");

// import the User Model database interactions
const User = require("../models/userModels");

// import the bycypt for the hashing password
const bcrypt = require("bcrypt");

// import the mailer to send the mail

const sendMail = require("../mailer/nodeMail");

// creating the router
const router = express.Router();

require("dotenv").config();


// route for the user Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // check if the user already exits
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({
                error: "Username or email already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(400).json({
            error: "User registered failed"
        })
    }
})







//route for initiating the password reset, send the mail to your mailbox with the link to reset the password

router.post("/password-reset", async(req, res) => {
    const {email} = req.body;

    try {
        // check if the user exits with the provided mail
        const user = await User.findOne({email: email});

        // if the user is not found, return the error response
        if(!user){
            return res.status(400).json({
                message: "User is not found"
            })
        }

        // generate the random token for the password reset. Token expires in 1 hour
        const token =jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1hr"});

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 360000;


        // save the updated user document  to the database
        await user.save();

        // create a password reset link using the generated token
        const resetLink = `http://localhost:3000/reset-password/${token}`

        // send the reset link to the user's mail (to, subject, text)
        await sendMail(user.email, "Password Reset", `Reset your password: ${resetLink}`)

        // response with the success message
        res.status(200).json({
            message: `Password reset link send to your email ${user.email}`
        })
    } catch(error){
        res.status(500).json({
            message: "Internal server error"
        })
    }
})




//route for resetting the password

router.post("/reset-password/:token", async(req, res) => {
    // get the new password
    const {password} = req.body;

    // get the token
    const {token} = req.params;

    // verify the token 

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // find the user by ID 
        const user = await User.findById(decode.userId);


        // if no user is found, return the error

        if(!user){
            return res.status(400).json({
                error: "user is not found"
            })
        }

        // check if the token has expried
        if(user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                error: "Token has expired"
            })
        }

        // has the new password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // save the updated user document to the database
        await user.save();

        // send the success response
        res.status(200).json({
            message: "Password reset successfull"
        })

    } catch(error){
        res.status(400).json({
            error: "Invalid or expired token"
        })
    }
})


module.exports = router;