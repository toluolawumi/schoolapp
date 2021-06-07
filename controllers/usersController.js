const User = require('../models/User');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const {SECRET}= process.env;

//routes - GET route - api/auth
//desc - Authenticate the user and get token
//access - Public route
exports.getLoggedInUser = async(req,res) => {
    try{
        const user = await (User.findById(req.user.id)).select("password");

        //return user
        res.json({
            statusCode:200,
            message: "User gotten successfully",
            user
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error");
    }
}

//routes - POST route - api/auth/login
//desc - Authenticate the user and get token
//access - Public route
exports.loginUser = async(req,res) => {
//check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
        return res.status(400).json({error: errors.array() })
    //else
    //destructure the request body
    const {email, password} = req.body;
    try{
        //initialize user
        let user = await User.findOne({email})
        if (!user) 
            return res
            .status(400)
            .json({
                statusCode: 400 , 
                message: "invalid credentials"
            });
        
        //else
        //check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        return res
        .status(400)
        .json({
            statusCode: 400, 
            message: "invalid credentials"
        })

        //else
        //there is a match, send token
        //send payload and signed token
        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(payload, SECRET, {
            expiresIn: 360000,
        }, (err, token) => {
            if (err) throw err
            res.json({
                statusCode: 200,
                message: "logged in successfully",
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userRole: user.userRole,
                    isTutor: user.isTutor,
                    isAdmin: user.isAdmin
                },
                token
            })
            }
        )
    }catch (error){
        console.log(err.message)
        res.status(500).send("Server Error")
    }
}