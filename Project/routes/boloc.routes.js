module.exports = (app) => {
  const filter = require("../controllers/boloc.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/manage/filter/sortby/:key", filter.sortBy);

  app.get("/api/manage/filter/sortbrand/:key", filter.sortBrand);

  app.get("/api/manage/filter/sortSize/:key", filter.sortSize);

  app.get("/api/manage/filter/search/:key", filter.search);
};
