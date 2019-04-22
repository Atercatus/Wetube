import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { errmsg: req.flash("error")[0] });
};

// local stratergy
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, confirmPasswd }
  } = req;

  try {
    if (password !== confirmPasswd) {
      res.status(400);
      throw Error("Passwords do not match.");
    }
    const user = await User({
      name: name,
      email: email
    });
    await User.register(user, password);
    next();
  } catch (err) {
    console.log(err);
    // redirect 할 때 join 에서 메시지 출력하도록 구성한다.
    req.flash("error", err.message);
    res.redirect(routes.join);
  }
};

export const getLogin = (req, res) => {
  res.render("login", { errmsg: req.flash("error")[0] });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  failureFlash: "Invalid username or password."
});

// github auth
export const githubLogin = passport.authenticate("github");

export const githubAuthCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;

  try {
    if (!email || email === "") throw Error();

    const user = await User.findOne({ email: email });

    if (user) {
      user.githubId = id;
      if (!user.avatarUrl) user.avatarUrl = avatar_url;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    });

    return cb(null, newUser);
  } catch (err) {
    return cb(err, null);
  }
};

export const githubAuth = (req, res, next) => {
  passport.authenticate("github", (err, user) => {
    if (err) {
      req.flash("error", "Github Oauth is failed.");
      res.redirect(routes.login);
    } else {
      req.logIn(user, err => {
        if (err) next(err);
      });
      // do nothing
      next();
    }
  })(req, res, next);
};

export const postGithubLogin = (req, res) => {
  console.log("postcal");
  res.redirect(routes.home);
};

// google auth
export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"]
});

export const googleAuthCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { sub, email, email_verified, picture, name }
  } = profile;

  try {
    if (email_verified === false) {
      throw Error("Email is not verified!");
    }
    const user = await User.findOne({ email: email });

    if (user) {
      user.googleId = sub;
      user.avatarUrl = picture;
      console.log(user.avatarUrl);

      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: sub,
      avatarUrl: picture
    });
    return cb(null, newUser);
  } catch (err) {
    console.log(err);
    return cb(err, null);
  }
};

export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

//////////////////
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const loggedinUserDetail = (req, res) => {
  console.log(req.user);
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user: user });
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) => {
  res.render("editProfile");
};

export const changePassword = (req, res) => {
  res.render("changePassword");
};

// lala = () => true // 이는 return true;와 같다
// implicit return(암시적 리턴): {}를 적지않으면 자동으로 리턴으로 된다.
