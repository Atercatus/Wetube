import routes from "./routes";

// export를 써야 다른 곳에서 사용 가능
// local var to global var
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    // req.locals는 res.locals에 이미 변수가 있을 겉 같을때 사용한다
    // 권장사항은 아니다.
    next();
};