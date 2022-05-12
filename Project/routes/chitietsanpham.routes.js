module.exports = (app) => {
  const detailProduct = require("../controllers/chitietsanpham.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/detail_product/add", detailProduct.createDetailProduct);

  app.get("/api/detail_product/list/:idsp", detailProduct.getList);

  app.get("/api/detail_product/list", detailProduct.getAllNumber);

  app.get("/api/detail_product/size/:idsp/:idms", detailProduct.getListColor);

  app.get("/api/detail_product/buy_now", detailProduct.getProductBuyNow);

  app.put("/api/detail_product/remove_product", detailProduct.removeNumberProduct);

  app.put("/api/detail_product/add_product", detailProduct.addNumberProduct);

  app.put("/api/detail_product/update_number_product", detailProduct.updateNumberProduct);

  app.get("/api/detail_product/number_product/:idsp/:idms/:idkt", detailProduct.getNumberProduct);

  app.get("/api/detail_product/number_product", detailProduct.getNumberOneProduct);
};
