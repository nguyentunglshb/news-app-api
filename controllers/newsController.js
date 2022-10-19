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
    view,
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
      view,
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
    const allNews = await News.find({
      status: "availble",
    });

    return res.json({
      success: true,
      data: allNews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getAllNewsDeleted = async (req, res) => {
  try {
    const allDeletedNews = await News.find({
      status: "soft-delete",
    });

    res.json({
      success: true,
      data: allDeletedNews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getNewsByKeyword = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  try {
    const allNews = await News.find({
      $or: [
        {
          category: {
            $regex: searchTerm,
          },
        },
        {
          title: {
            $regex: searchTerm,
          },
        },
        {
          description: {
            $regex: searchTerm,
          },
        },
        {
          author: {
            $regex: searchTerm,
          },
        },
        {
          content: {
            $regex: searchTerm,
          },
        },
      ],
      status: "availble",
    }).sort({
      publishAt: -1,
    });

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

module.exports.getNewsById = async (req, res) => {
  const id = req.query.id;
  try {
    const targetNews = await News.findById(id);

    return res.json({
      success: true,
      data: targetNews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.editNews = async (req, res) => {
  const {
    _id,
    source,
    category,
    author,
    title,
    description,
    url,
    urlToImage,
    content,
  } = req.body;
  try {
    const targetNews = await News.findById(_id);
    targetNews.source = source ? source : targetNews.source;
    targetNews.category = category ? category : targetNews.category;
    targetNews.author = author ? author : targetNews.author;
    targetNews.title = title ? title : targetNews.title;
    targetNews.description = description ? description : description;
    targetNews.url = url ? url : targetNews.url;
    targetNews.urlToImage = urlToImage ? urlToImage : targetNews.urlToImage;
    targetNews.content = content ? content : targetNews.content;

    await targetNews.save();

    res.json({
      success: true,
      message: "Edit new successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.deleteNews = async (req, res) => {
  const { _id } = req.body;

  try {
    const targetNews = await News.findById(_id);
    targetNews.status = "soft-delete";
    await targetNews.save();

    res.json({
      success: true,
      message: "Delete news successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.restoreNews = async (req, res) => {
  const { _id } = req.body;
  try {
    const targetNews = await News.findById(_id);
    targetNews.status = "availble";
    await targetNews.save();

    res.json({
      success: true,
      message: "Restore news successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
