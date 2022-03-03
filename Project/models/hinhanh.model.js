const mysql = require("./db");

const Image = function (image) {
  this.id_sp = image.idsp;
  this.hinh_anh_sp = image.hinhanh;
};

Image.createImage = (newImage, result) => {
  mysql.query("INSERT INTO hinh_anh SET ?", newImage, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new image");
    result(null, {...newImage});
  });
};

Image.getImage = (id, result) => {
  mysql.query(`SELECT * FROM hinh_anh WHERE id_sp='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new image");
    result(null, res);
  });
};

module.exports = Image;
