const mongoose = require('mongoose');


//create UserSchema
const UserSchema = mongoose.Schema(
    {
        //define properties
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        userRole:{
            type: String,
            enum: ["admin", "tutor", "student", "no assigned"],
            default: "not assigned"
        },
        isTutor: {
            type:Boolean,
            default: 0
        },
        isAdmin:{
            type: Boolean,
            default: 0
        }

    }, 
    {
        timestamps: true
    }   
);

module.exports = mongoose.model("User", UserSchema);