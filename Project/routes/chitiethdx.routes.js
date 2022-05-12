module.exports = (app) => {
  const detailExportInvoice = require("../controllers/chitiethdx.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/detail_exportInvoice/add", detailExportInvoice.createDetailExportInvoice);

  app.get("/api/manage/detail_exportInvoice/list/id_hdx=:idhdx", detailExportInvoice.getListAll);

  app.get("/api/manage/detail_exportInvoice/sum_number", detailExportInvoice.sumNumberProduct);

  app.get("/api/manage/detail_exportInvoice/sum_number/idsp=:idsp", detailExportInvoice.sumNumber);
};
