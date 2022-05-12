const VerifyEmail = require("../models/verifyEmail.model");

module.exports = {
  sendCode: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const verify = new VerifyEmail({
      email: req.params.email,
    });

    VerifyEmail.sendCode(verify, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
