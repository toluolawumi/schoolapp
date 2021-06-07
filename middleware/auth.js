//check to see if there is a token and header
require('dotenv').config();
const {SECRET} = process.env

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    //get token from header
    const token = req.header("x-auth-token")

    //check if token doesnt exist
    if(!token)
        return res
            .status(401)
            .json({
                statusCode: 401, 
                message: "No token, authorization denied"
            })
    //else..token exists
    try{
        const decoded = jwt.verify(token, SECRET)
        //assign user to req object
        req.user = decoded.user;
        next()
    }catch (err){
        res.status(401).json({statusCode: 401, message: "token is not valid"})
    }

}