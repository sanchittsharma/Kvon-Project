const express=require("express")
const mongoose=require("mongoose")
const {registrictToLoginUser}=require("../middlewares/auth")
const passport=require("passport")
// const { handleGoogleAuth } = require("../controllers/user")
const router=express.Router()
const {handleChangePassword,handleForgotPassword,handleGoogleAuth,handleResetPassword,handleUserRegister,handleuserLogin}=require("../controllers/user")


router.get("/login",async(req,res)=>{
    return res.render("login")
})
router.get("/",async(req,res)=>{
    return res.render("login")
})
router.get("/signup",async(req,res)=>{
    return res.render("signup")
})
router.get("/forgot-password",async(req,res)=>{
    return res.render("forgot-password",{message:null})
})
router.post("/login",handleuserLogin)
router.post("/register",handleUserRegister)
router.post("/changepass",registrictToLoginUser,handleChangePassword)
router.post("/forgot-Password",handleForgotPassword)
router.post("/reset-password/:token",handleResetPassword)
router.get("/resetpassword/:token",async(req,res)=>{
    return res.render("reset-password")
})
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
 // router.get('/auth/google/callback',handleGoogleAuth);
 router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = setUser(req.user); 
    res.cookie("uid", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    });
  //   res.redirect("/userDashboard");
  res.send(`<script>
        alert('Login successful');
        window.location.href = '/'; 
      </script>`)
  });
  module.exports=router
