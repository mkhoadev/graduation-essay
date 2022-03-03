const multer = require("multer");

const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/public/asset/image/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "__" + file.originalname);
  },
});

const upload = multer({storage: fileStore});

module.exports = (app) => {
  const image = require("../controllers/hinhanh.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/manage/photos/upload",
    upload.array("photos"),
    image.createImage
  );

  app.get("/api/manage/photos/id=:id", image.getImage)

  // app.get("/api/manage/photos/id=:id", image.getImage);
};
