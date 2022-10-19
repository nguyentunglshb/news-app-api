const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsController");

router.post("/create", newsController.createNews);
router.get("/getAll", newsController.getAllNews);
router.get("/getAllDeleted", newsController.getAllNewsDeleted);
router.get("/getNewsbyId", newsController.getNewsById);
router.post("/editNews", newsController.editNews);
router.get("/search", newsController.getNewsByKeyword);
router.post("/plusView", newsController.plusView);
router.post("/deleteNews", newsController.deleteNews);
router.post("/restoreNews", newsController.restoreNews);

module.exports = router;
