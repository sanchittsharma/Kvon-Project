const jwt=require("jsonwebtoken")
const User=require("../models/user")
const secretKey = "";

function setUser(user) {
    return jwt.sign({
        userEmail:user.userEmail
    },secretKey)
}



module.exports={setUser}