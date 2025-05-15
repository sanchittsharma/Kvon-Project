const jwt =require("jsonwebtoken")
const User=require("../models/user")
const secretKey="Sanchit@123#";

async function registrictToLoginUser(req,res,next) {
    const userUid=req.cookies?.uid;
    if (!userUid) {
        console.log("No token found in cookies.");
        return res.redirect("/");
      }
      try {
    
        const decoded = jwt.verify(userUid, secretKey);
        const user = await User.findOne({ userEmail: decoded.userEmail });
        if (!user) {
          console.log("User not found:", decoded.userEmail);
          return res.redirect("/");  
        }
        req.user = user;
        // console.log( user);  
    
        next(); 
      } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.redirect("/");  
      }
}

module.exports={registrictToLoginUser}
