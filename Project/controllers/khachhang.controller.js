const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/khachhang.model");

dotenv.config();

module.exports = {
  createUser: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      ngaytaotk: req.body.ngaytaotk,
    });

    User.createUser(user, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getUser: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    User.getUser(req.body.email, req.body.password, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        const dataUser = req.body;
        const accessToken = jwt.sign(dataUser, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).send({datatUser: data, accessToken: accessToken});
      }
    });
  },

  checkUser: (req, res) => {
    User.getCheckuser(req.params.email, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },
};
