const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
require("../models/User");

const User = mongoose.model("user");

// set token into the cookie.
// user is from user model that we return when auth success.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// the first argu is token, we set preivously step into the cookie.
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      //passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, cb) => {

      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return cb(null, existingUser);
      }

      // we don't have a record with this ID, make a new record.
      const user = await new User({ googleId: profile.id }).save();
      cb(null, user);
      
    }
  )
);
