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
router.post("/signup",handleUserRegister)
router.post("/changepass",registrictToLoginUser,handleChangePassword)
router.post("/forgot-Password",handleForgotPassword)
router.patch("/resetpassword/:token",handleResetPassword)

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/auth/google/callback',handleGoogleAuth);
  module.exports=router
