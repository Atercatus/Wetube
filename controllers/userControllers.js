import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join");
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, confirmPasswd }
  } = req;

  if (password !== confirmPasswd) {
    res.status(400);
    res.render("join");
  } else {
    try {
      const user = await User({
        name: name,
        email: email
      });
      await User.register(user, password);
      next();
    } catch (err) {
      console.log(err);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.gitgubId = id;
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

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) => {
  console.log("help");
  res.render("userDetail");
};

export const editProfile = (req, res) => {
  res.render("editProfile");
};

export const changePassword = (req, res) => {
  res.render("changePassword");
};

// lala = () => true // 이는 return true;와 같다
// implicit return(암시적 리턴): {}를 적지않으면 자동으로 리턴으로 된다.
