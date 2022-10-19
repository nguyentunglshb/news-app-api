const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  source: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    enum: [
      "su-kien",
      "xa-hoi",
      "the-gioi",
      "kinh-doanh",
      "bat-dong-san",
      "the-thao",
      "viec-lam",
      "nhan-ai",
      "suc-khoe",
      "van-hoa",
      "giai-tri",
      "xe",
      "giao-duc",
      "phap-luat",
    ],
    default: "su-kien",
  },
  author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  urlToImage: {
    type: String,
    require: true,
  },
  publishAt: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    require: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["soft-delete", "availble"],
    default: "availble",
  },
});

module.exports = mongoose.model("news", NewsSchema);
