module.exports = (app) => {
  const size = require("../controllers/kichthuoc.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/size/add", size.createSize);

  app.get("/api/manage/size/id=:id", size.getSize);

  app.get("/api/manage/size/list", size.getList);

  app.delete("/api/manage/size/delete/:idkt", size.deSize);
};
