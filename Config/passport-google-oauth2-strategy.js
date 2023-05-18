const User = require("../Models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
     new GoogleStrategy(
          {
               clientID: "48828366433-6s9feutncaiqgoo5lrglhcoi9l6tl9pr.apps.googleusercontent.com",
               clientSecret: "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",
               callbackURL: "http://localhost:8011/user/auth/google/callback",
          },
          async function (accessToken, refreshToken, profile, done) {
               let user = await User.findOne({ email: profile.emails[0].value });
               console.log(profile);
               if (user) {
                    return done(null, user);
               } else {
                    {
                         console.log("User Account doesnot exist. Please Sign Up");
                         return;
                    }
               }
          }
     )
);

module.exports = passport;