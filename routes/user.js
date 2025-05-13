const express=require("express")
const mongoose=require("mongoose")
const {registrictToUser}=require("../middlewares/auth")
const passport=require("passport")
const { handleGoogleAuth } = require("../controllers/user")
const router=express.Router()



router.post("/changepass",registrictToUser,handleChangePassword)
router.post("/forgotPassword",handleForgotPassword)
router.patch("/resetpassword/:token",handleResetPassword)

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/auth/google/callback',handleGoogleAuth);
  module.exports=router