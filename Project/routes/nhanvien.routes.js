module.exports = (app) => {
  const employee = require("../controllers/nhanvien.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/auth/manage/employee/signup", employee.createEmployee);

  app.post("/api/auth/manage/employee/signin", employee.loginEmployee);

  app.get("/api/manage/checkEmployee/email=:email", employee.checkEmployee);

  app.get("/api/manage/employee/idnv=:idnv", employee.getEmployee);

  app.get("/api/manage/employee/list", employee.getListEmployee);

  app.get("/api/manage/employee/get_all_shipper", employee.getAllShiper);

  app.put("/api/manage/employee/update/idnv=:idnv", employee.updateEmployee);

  app.delete("/api/manage/employee/delete/idnv=:idnv", employee.deleteEmployee);
};
