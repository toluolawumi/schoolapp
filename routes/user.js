const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const auth = require("../middleware/auth.js")

//import the router controller
const usersController = require('../controllers/userController');

//login user route
router.post("/api/auth/login", 
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists()
    ],
    usersController.loginUser
);

//get inlogged
router.get("/api/auth", auth, usersController.getLoggedInUser)

module.exports = router;




