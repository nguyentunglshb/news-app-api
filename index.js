const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const newsRouter = require("./routes/news");

const PORT = process.env.PORT || 6969;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${USERNAME}:${PASSWORD}@news.y7bnbvh.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/news", newsRouter);

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
