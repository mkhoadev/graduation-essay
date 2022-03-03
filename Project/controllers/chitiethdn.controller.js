const DetailImportInvoice = require("../models/chitiethdn.model");

module.exports = {
  createDetailImportInvoice: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const detailImportInvoice = new DetailImportInvoice({
      gianhap: req.body.gianhap,
      soluong: req.body.soluong,
      idsp: req.body.idsp,
      idhdn: req.body.idhdn,
    });

    DetailImportInvoice.createDetailImportInvoice(
      detailImportInvoice,
      (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      },
    );
  },

  // getListImportInvoice: (req, res) => {
  //   if (!req.body) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //   }
  //   ImportInvoice.getListImportInvoice((err, data) => {
  //     if (err) {
  //       res.status(500).send({
  //         message: err.message,
  //       });
  //     } else res.status(200).send(data);
  //   });
  // },

  // getId: (req, res) => {
  //   if (!req.body) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //   }
  //   ImportInvoice.getId((err, data) => {
  //     if (err) {
  //       res.status(500).send({
  //         message: err.message,
  //       });
  //     } else res.status(200).send(data);
  //   });
  // },
};
