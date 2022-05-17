const multer = require("multer");

const fileStores = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/public/asset/imageReview/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "__" + file.originalname);
  },
});

const uploadRv = multer({storage: fileStores});

module.exports = (app) => {
  const imageReview = require("../controllers/hinhanhdanhgia.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/review/photos/upload", uploadRv.array("photos"), imageReview.createImageReview);

  app.get("/api/manage/image_review/iddg=:iddg", imageReview.getImage);
};
