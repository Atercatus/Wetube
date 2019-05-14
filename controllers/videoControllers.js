import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos: videos });
  } catch (error) {
    req.flash("error", error.message);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  // ECMAScript6 이전버전
  // searchingBy = req.query.term
  const {
    query: { term: searchingBy }
  } = req;

  let videos = [];

  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }

  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos: videos
  });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title: title,
    description: description,
    creator: req.user.id
  });

  req.user.videos.push(newVideo.id);
  await req.user.save();
  res.redirect(`${routes.videoDetail(newVideo.id)}`);
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id).populate("creator");
    // video.views += 1;
    // await video.save();
    res.render("videoDetail", { pageTitle: video.title, video: video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);

    // protect video
    if (String(video.creator) !== req.user.id) {
      console.log(video.creator);
      console.log(req.user.id);
      throw Error("Permission error");
    }

    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video: video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;

  try {
    const video = await Video.findById(id);

    if (String(video.creator) !== req.user.id) {
      throw Error("Permission error");
    }

    await video.update({ title, description });
    // await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error("Permission error");
    }
    await video.remove();
    // await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }

  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (err) {
    res.status(400);
    res.end();
  }
};
