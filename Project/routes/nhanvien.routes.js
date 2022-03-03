module.exports = (app) => {
  const employee = require("../controllers/nhanvien.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/auth/manage/signup", employee.createEmployee);

  app.post("/api/auth/manage/signin", employee.getEmployee);

  app.get("/api/manage/checkEmployee/email=:email", employee.checkEmployee);
};
