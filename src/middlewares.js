import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });
// export를 써야 다른 곳에서 사용 가능
// local var to global var
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // req.locals는 res.locals에 이미 변수가 있을 겉 같을때 사용한다
  // 권장사항은 아니다.
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const onlyNotOAuth = (req, res, next) => {
  if (req.user.OAuth === "local") {
    next();
  } else {
    res.redirect(routes.home);
  }
};

// string is tag name
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
