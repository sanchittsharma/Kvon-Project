const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); 
const { setUser } = require('../service/auth'); 

passport.use(new GoogleStrategy({
  clientID: "185291623897-4heosca0det76378n04h3skmp5uigb3e.apps.googleusercontent.com",
  clientSecret:'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',
  callbackURL: "http://localhost:1000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ userEmail: profile.emails[0].value });
    if (!user) {
      user = await User.create({
        userEmail: profile.emails[0].value,
        userName: profile.displayName,
        userPasword :profile.userPasword
        
      });
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
passport.serializeUser((user, done) => {
    done(null, user._id); 
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); 
    } catch (err) {
      done(err, null);
    }
  });
