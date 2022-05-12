module.exports = (app) => {
  const position = require("../controllers/chucvu.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/manage/position/add", position.createPosition);

  app.get("/api/manage/position/id=:id", position.getPosition);

  app.get("/api/manage/position/list", position.getListPosition)
};
