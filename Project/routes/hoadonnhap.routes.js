module.exports = (app) => {
  const importInvoice = require("../controllers/hoadonnhap.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/importInvoice/add", importInvoice.createImportInvoice);

  app.get("/api/manage/importInvoice/list", importInvoice.getListImportInvoice);

  app.get("/api/manage/importInvoice/sum_price/idhdn=:idhdn", importInvoice.sumPriceInvoice);

  app.get("/api/manage/importInvoice/sum_price", importInvoice.sumPriceInvoices);

  app.delete("/api/manage/importInvoice/delete/id=:id", importInvoice.deleteImportInvoice);
};
