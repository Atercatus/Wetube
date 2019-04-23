import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { errmsg: req.flash("error")[0] });
};

// local stratergy
export const postJoin = async (req, res, next) => {
  const {
    body: { userId, nickname, email, password, confirmPasswd }
  } = req;

  try {
    // 비밀번호 검증
    if (password !== confirmPasswd) {
      throw Error("Passwords do not match.");
    }

    const user = await User({
      OAuth: "local",
      userId,
      nickname,
      email
    });

    // name 중복 검사
    if (await User.findOne({ userId })) {
      throw Error("ID is duplicated");
    }

    // 비밀번호 암호화
    await User.register(user, password);

    next();
  } catch (err) {
    // console.log(err);
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

export const githubAuthCallback = async (accessToken, __, profile, cb) => {
  const {
    _json: { id, avatar_url, email, login }
  } = profile;

  try {
    if (!email || email === "") throw Error("Github email is private.");

    // 이미 github을 통한 가입이 되어있는 경우
    const user = await User.findOne({ userId: id });

    // login
    if (user) {
      return cb(null, user);
    }

    // join
    const newUser = await User.create({
      OAuth: "github",
      email,
      nickname: login,
      userId: id,
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
      req.flash("error", err.message);
      res.redirect(routes.login);
    } else {
      req.logIn(user, err => {
        if (err) next(err);
      });

      next();
    }
  })(req, res, next);
};

export const postGithubLogin = (req, res) => {
  if (!req.user.nickname || req.user.nickname === "") {
    res.redirect(`/users${routes.OAuthJoin}`);
  } else {
    res.redirect(routes.home);
  }
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

  console.log(profile);
  console.log(sub);

  try {
    if (email_verified === false) {
      throw Error("Email is not verified!");
    }
    const user = await User.findOne({ userId: sub });

    // login
    if (user) {
      return cb(null, user);
    }

    // join
    const newUser = await User.create({
      OAuth: "google",
      email,
      nickname: name,
      userId: sub,
      avatarUrl: picture
    });
    return cb(null, newUser);
  } catch (err) {
    return cb(err);
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
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { userId }
  } = req;
  try {
    const user = await User.findByOne({ userId: userId });
    res.render("userDetail", { pageTitle: "User Detail", user: user });
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile");
};

export const postEditProfile = async (req, res) => {
  const {
    body: { nickname, email },
    file
  } = req;

  try {
    await User.findOneAndUpdate(
      { userId: req.user.userId },
      {
        nickname,
        email,
        avatarUrl: file ? "/" + file.path : req.user.avatarUrl
      }
    );

    res.redirect(`/users${routes.me}`);
  } catch (err) {
    res.redirect(`/users${routes.editProfile}`);
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { errmsg: req.flash("error")[0] });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPasswordConfirm }
  } = req;
  try {
    if (newPassword === "" || oldPassword === "") {
      throw new Error("Need password");
    }

    if (newPassword !== newPasswordConfirm) {
      throw new Error("Password do not match");
    }

    if (oldPassword === newPassword) {
      throw new Error("Current password is equaled to new password");
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(`/users${routes.me}`);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(`/users${routes.changePassword}`);
  }
};

// lala = () => true // 이는 return true;와 같다
// implicit return(암시적 리턴): {}를 적지않으면 자동으로 리턴으로 된다.
