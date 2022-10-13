const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsController");

router.post("/create", newsController.createNews);
router.get("/getAll", newsController.getAllNews);
router.post("/plusView", newsController.plusView);

module.exports = router;
