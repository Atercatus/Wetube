import {videos} from "../db"

export const home = (req, res) => {
    res.render("home", {pageTitle: "Home", videos:videos});
}

export const search = (req, res) => {
    // ECMAScript6 이전버전
    // searchingBy = req.query.term
    const { query: {term: searchingBy}} = req;

    res.render("search", {
        pageTitle: "Search",
        searchingBy: searchingBy
    });
}

export const upload = (req, res) => {
    res.render("upload", {pageTitle: "Upload"});
}

export const videoDetail = (req, res) => {
    res.render("videoDetail", {pageTitle: "Video Detail"});
}

export const editVideo = (req, res) => {
    res.render("editVideo", {pageTitle: "Edit Video"});
}

export const deleteVideo = (req, res) => {
    res.render("deleteVideo", {pageTitle: "Delete Video"});
}