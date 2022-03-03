module.exports = (app) => {
  const color = require("../controllers/mausac.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/color/add", color.createColor);

  app.get("/api/manage/color/id=:id", color.getColor);

  app.get("/api/manage/color/list", color.getList);
};
