import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join");
};

export const postJoin = (req, res) => {
    const {
        body: {name, email, passwd, confirmPasswd}
    } = req;

    if(passwd !== confirmPasswd){
        res.status(400); 
        res.render("join");
    } else{
        // To Do: Register User
        // To Do: Log user in
        res.redirect(routes.home);
    }

};

export const getLogin = (req, res) => {
    res.render("login");
};

export const postLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    // To Do: Process Log Out
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
