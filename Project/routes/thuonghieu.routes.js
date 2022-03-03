module.exports = (app) => {
  const brand = require("../controllers/thuonghieu.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/brand/add", brand.createBrand);

  app.get("/api/manage/brand/id=:id", brand.getBrand);

  app.get("/api/manage/brand/list", brand.getList)
};
