import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import GithubStrategy from "passport-github";
// import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/User";
import {
  githubAuthCallback,
  googleAuthCallback
  //   facebookLoginCallback
} from "./controllers/userControllers";

passport.use(User.createStrategy()); // passport-local의 LocalStrategy instance를 반환한다

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: (function() {
        if (process.env.PRODUCTION === "true") {
          return process.env.GIT_CALLBACK_URL_PROD;
        } else {
          return process.env.GIT_CALLBACK_URL;
        }
      })()
    },
    githubAuthCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
      callbackURL: (() => {
        if (process.env.PRODUCTION === "true") {
          return process.env.GOOGLE_CALLBACK_URL_PROD;
        } else {
          return process.env.GOOGLE_CALLBACK_URL;
        }
      })()
    },
    googleAuthCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
