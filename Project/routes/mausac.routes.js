module.exports = (app) => {
  const color = require("../controllers/mausac.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/color/add", color.createColor);

  app.get("/api/color/id=:id", color.getColor);

  app.get("/api/color/idms=:idms", color.getOneColor);

  app.get("/api/color/list", color.getListColor);

  app.delete("/api/color/delete_color/:idms", color.deColor);
};
