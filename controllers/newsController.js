const News = require("../models/News");

// create
module.exports.createNews = async (req, res) => {
  const {
    source,
    category,
    author,
    title,
    description,
    url,
    urlToImage,
    content,
  } = req.body;

  if (
    !source ||
    !category ||
    !author ||
    !title ||
    !description ||
    !url ||
    !urlToImage ||
    !content
  ) {
    return res.status(400).json({
      success: false,
      message: "Nhap thieu truong roi thang loz",
    });
  }

  try {
    const theNewOne = new News({
      source,
      category,
      author,
      title,
      description,
      url,
      urlToImage,
      content,
    });
    await theNewOne.save();
    res.json({
      success: true,
      message: "create news successfully",
      data: theNewOne,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all
module.exports.getAllNews = async (req, res) => {
  try {
    const allNews = await News.find({});

    return res.json({
      success: true,
      data: allNews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.plusView = async (req, res) => {
  const { _id } = req.body;
  try {
    const targetNews = await News.findById(_id);
    targetNews.view = targetNews.view + 1;
    targetNews.save();

    return res.json({
      success: true,
      message: "Plus",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
