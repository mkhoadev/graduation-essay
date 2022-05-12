module.exports = (app) => {
  const detailImportInvoice = require("../controllers/chitiethdn.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/detail_importInvoice/add", detailImportInvoice.createDetailImportInvoice);

  app.get("/api/manage/detailImportInvoice/sum_number/idsp=:idsp", detailImportInvoice.sumNumber);

  app.get("/api/manage/detailExportInvoice/sum_number", detailImportInvoice.sumNumberProduct);

  app.get("/api/manage/detail_import_invoice/list/idhdn=:idhdn", detailImportInvoice.getDetailProductList);

  app.put("/api/manage/detail_import_invoice/add_product", detailImportInvoice.addNumberProduct);
};
