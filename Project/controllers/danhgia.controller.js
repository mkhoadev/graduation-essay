const Review = require("../models/danhgia.model");

module.exports = {
  createReview: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const review = new Review({
      sosao: req.body.sosao,
      noidung: req.body.noidung,
      ngaydg: req.body.ngaydg,
      idhdx: req.body.idhdx,
      idsp: req.body.idsp,
      idms: req.body.idms,
      idkt: req.body.idkt,
    });

    Review.createReview(review, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200);
    });
    Review.getIdReview((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListReview: (req, res) => {
    Review.getListReview((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getReview: (req, res) => {
    Review.getReview(req.params.idhdx, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getReviewProduct: (req, res) => {
    Review.getReviewProduct(req.params.idsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getReviewInvoice: (req, res) => {
    Review.getReviewInvoice(req.params.idhdx, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getOneReview: (req, res) => {
    Review.getOneReview(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  updateStatus: (req, res) => {
    Review.updateStatus(req.params.status, req.params.iddg, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
