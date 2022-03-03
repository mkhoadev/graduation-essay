module.exports = (app) => {
  const detailImportInvoice = require("../controllers/chitiethdn.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/detailImportInvoice/add", detailImportInvoice.createDetailImportInvoice);

  // app.get("/api/manage/detailImportInvoice/list", detailImportInvoice.getListImportInvoice);

  // app.get("/api/manage/detailImportInvoice/id", detailImportInvoice.getId)
};