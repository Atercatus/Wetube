import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import GithubStrategy from "passport-github";
// import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/User";
import {
  githubLoginCallback,
  googleLoginCallback
  //   facebookLoginCallback
} from "./controllers/userControllers";
import routes from "./routes";

passport.use(User.createStrategy()); // passport-local의 LocalStrategy instance를 반환한다

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
      callbackURL: `http://localhost:4000${routes.googleCallback}`
    },
    googleLoginCallback
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_ID,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: `https://tiny-hound-52.localtunnel.me/${
//         routes.facebookCallback
//       }`,
//       profileFields: ["id", "displayName", "photos", "email"],
//       scope: ["public_profile", "email"]
//     },
//     facebookLoginCallback
//   )
// );

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
