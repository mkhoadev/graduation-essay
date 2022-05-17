module.exports = (app) => {
  const product = require("../controllers/sanpham.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/product/add", product.createProduct);

  app.get("/api/manage/product/idsp=:idsp", product.getProduct);

  app.get("/api/manage/product/list", product.getListProducts);

  app.get("/api/manage/product/product_list", product.getProductList);

  app.put("/api/manage/product/update/:id", product.updateProduct);

  app.delete("/api/manage/product/delete/id=:id", product.deleteProduct);

  app.get("/api/manage/new_product/list", product.getNewProduct);

  app.get("/api/manage/discount_product/list", product.getDiscountProduct);
};
