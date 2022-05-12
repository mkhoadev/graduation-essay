module.exports = (app) => {
  const address = require("../controllers/diachi.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/address/add", address.createAddress);

  app.get("/api/manage/address/list", address.getListAddress);

  app.get("/api/manage/address/idkh=:idkh", address.getAddress);

  app.get("/api/manage/address/iddc=:iddc", address.getIdAddress);

  app.delete("/api/manage/address/delete/id=:id", address.deleteAddress);
};
