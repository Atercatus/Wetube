export const join = (req, res) => {
    res.render("join");
}

export const login = (req, res) => {
    res.render("login");
}

export const logout = (req, res) => {

}

export const userDetail = (req, res) => {
}

export const editProfile = (req, res) => {
    res.render("editProfile");
}

export const changePassword = (req, res) => {
    res.render("changePassword");
}

// lala = () => true // 이는 return true;와 같다
// implicit return(암시적 리턴): {}를 적지않으면 자동으로 리턴으로 된다.
