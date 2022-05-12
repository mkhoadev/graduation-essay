const PayOnline = require("../models/thanhtoanonline.model");
module.exports = {
  create_payment_url: (req, res, next) => {
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const payOnline = new PayOnline({
      ipAddr: ipAddr,
      orderType: req.body.orderType,
      amount: req.body.amount,
      bankCode: req.body.bankCode,
      language: req.body.language,
    });

    PayOnline.create_payment_url(payOnline, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  vnpay_ipn: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    PayOnline.vnpay_ipn(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
