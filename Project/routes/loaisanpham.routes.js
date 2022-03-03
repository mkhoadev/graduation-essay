module.exports = (app) => {
  const typeProduct = require("../controllers/loaisanpham.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/typeproduct/add", typeProduct.createTypeProduct);

  app.get("/api/manage/typeproduct/id=:id", typeProduct.getTypeProduct);

  app.get("/api/manage/typeproduct/list", typeProduct.getList);
};
