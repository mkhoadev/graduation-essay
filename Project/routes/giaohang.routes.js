module.exports = (app) => {
  const deliver = require("../controllers/giaohang.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/delivier/add", deliver.createDeliver);

  app.post("/api/manage/deliver/update_status", deliver.updateStatus);

  app.post("/api/manage/deliver/update_status_note", deliver.updateStatusNote);

  app.get("/api/manage/deliver/list_invoice/idnv=:idnv", deliver.getInvoice);

  app.put("/api/manage/deliver/get_invoice_status/idnv=:idnv", deliver.getInvoiceStatus);

  app.get("/api/manage/deliver/one_invoice/idhdx=:idhdx", deliver.getOneInvoice);

  app.get("/api/manage/deliver/list_invoice", deliver.getAllInvoice);

  app.delete("/api/manage/deliver/delete_invoice/idhdx=:idhdx", deliver.deleteInvoice);
};
