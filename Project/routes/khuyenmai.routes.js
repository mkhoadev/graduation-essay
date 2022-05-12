module.exports = (app) => {
  const discount = require("../controllers/khuyenmai.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/discount/add", discount.createDiscount);

  app.get("/api/manage/discount/id=:id", discount.getDiscount);

  app.get("/api/manage/discount/list", discount.getList);

  app.delete("/api/manage/discount/delete=:id", discount.deleteDiscount);
};
