const mysql = require("./db");

const ImageReview = function (image) {
  this.id_dg = image.iddg;
  this.hinh_anh_dg = image.hinhanh;
};

ImageReview.createImage = (newImage, result) => {
  mysql.query("INSERT INTO hinh_anh_danh_gia SET ?", newImage, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new image");
    result(null, {...newImage});
  });
};

ImageReview.getImage = (iddg, result) => {
  mysql.query(`SELECT * FROM hinh_anh_danh_gia WHERE id_dg='${iddg}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = ImageReview;
