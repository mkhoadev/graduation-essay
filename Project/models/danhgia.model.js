const mysql = require("./db");

const Review = function (review) {
  this.so_sao = review.sosao;
  this.noi_dung_dg = review.noidung;
  this.id_hdx = review.idhdx;
};

Review.createReview = (newReview, result) => {
  mysql.query("INSERT INTO danh_gia SET ?", newReview, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new review");
    result(null, res);
  });
};

Review.getListReview = (result) => {
  mysql.query("SELECT * FROM danh_gia", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách đánh giá thành công");
    result(null, res);
  });
};

Review.getReview = (idhdx, result) => {
  mysql.query(`SELECT * FROM danh_gia WHERE id_hdx='${idhdx}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách đánh giá thành công");
    result(null, res);
  });
};

Review.getReviewProduct = (idsp, result) => {
  console.log(idsp);
  mysql.query(
    `SELECT danh_gia.*, san_pham.* FROM hoa_don_xuat INNER JOIN danh_gia ON hoa_don_xuat.id_hdx = danh_gia.id_hdx INNER JOIN chi_tiet_hdx ON hoa_don_xuat.id_hdx = chi_tiet_hdx.id_hdx INNER JOIN san_pham ON chi_tiet_hdx.id_sp = san_pham.id_sp WHERE san_pham.id_sp='${idsp}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách đánh giá sản phẩm thành công");
      result(null, res);
    },
  );
};

module.exports = Review;
