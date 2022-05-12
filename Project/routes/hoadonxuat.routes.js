module.exports = (app) => {
  const exportInvoice = require("../controllers/hoadonxuat.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/exportInvoice/add", exportInvoice.createExportInvoice);

  app.get("/api/manage/exportInvoice/list/idkh=:idkh", exportInvoice.getListExportInvoice);

  app.get("/api/manage/exportInvoice/get_all", exportInvoice.getAll);

  app.get("/api/manage/exportInvoice/sum_price", exportInvoice.sumPriceInvoices);

  app.get("/api/manage/exportInvoice/list/idhdx=:idhdx", exportInvoice.getExportInvoice);

  app.get("/api/manage/exportInvoice/price_statistical", exportInvoice.getPriceExportInvoice);

  app.put("/api/manage/exportInvoice/update/id_hdx=:id_hdx", exportInvoice.updateStatus);

  app.delete("/api/manage/exportInvoice/delete/id=:id", exportInvoice.deleteExportInvoice);

  app.put("/api/manage/exportInvoice/wait_orders/idkh=:idkh", exportInvoice.getOrders);
};
